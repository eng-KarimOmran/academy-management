import { SubscriptionCreateInput } from "../../../prisma/generated/models";
import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import { buildPagination, buildPaginationMeta } from "../../shared/utils/Pagination";
import { calculateAccountBalance } from "../ledgerTransaction/ledgerTransaction.utils";
import { getLessonStats } from "../lesson/lesson.utils";
import { ISubscriptionService } from "./Subscription.type";
import { buildSubscriptionWhere, getSubscriptionStatus, orderBy } from "./subscription.utils";

const SubscriptionService: ISubscriptionService = {
  async createSubscription(data, userId) {
    const { params, body } = data;
    const { academyId } = params;

    const subscription = prisma.$transaction(async (tx) => {
      const [client, area, course, jobProfile] = await Promise.all([
        tx.client.findFirst({ where: { id: body.clientId, academyId } }),
        tx.area.findFirst({ where: { id: body.areaId, academyId } }),
        tx.course.findFirst({ where: { id: body.courseId, academyId } }),
        tx.jobProfile.findFirst({ where: { academyId_userId: { academyId, userId }, jobProfileType: "SECRETARY" } }),
      ])

      if (!client) throw ApiError.NotFound("Client")
      if (!area) throw ApiError.NotFound("Area")
      if (!course) throw ApiError.NotFound("Course")

      const dataSubscription: SubscriptionCreateInput = {
        academy: { connect: { id: academyId } },
        client: { connect: { id: client.id } },
        course: { connect: { id: course.id } },
        area: { connect: { id: area.id } },
        ...(jobProfile && { createdBy: { connect: { id: jobProfile.id } } }),
        priceAtBooking: course.priceDiscounted,
        requiredInitialDeposit: course.requiredInitialDeposit,
        sessionDurationMinutes: course.sessionDurationMinutes,
        sessionsBeforeFullPayment: course.sessionsBeforeFullPayment,
        totalSessions: course.totalSessions,
        trainingTypeAtRegistration: body.trainingTypeAtRegistration,
        subscriptionStatus: "PENDING_DEPOSIT",
        financialAccount: { create: {} },
      }

      return await tx.subscription.create({ data: dataSubscription })
    })

    return subscription
  },

  async getAllSubscriptions(data) {
    const { params, query } = data;
    const { academyId } = params;
    const { page, limit, search, subscriptionStatus } = query;

    const where = buildSubscriptionWhere({ search, subscriptionStatus, academyId })

    const { take, skip } = buildPagination({ page, limit })

    const [subscriptions, count] = await prisma.$transaction([
      prisma.subscription.findMany({ where, skip, take, orderBy }),
      prisma.subscription.count({ where }),
    ]);

    return {
      items: subscriptions,
      pagination: buildPaginationMeta({ count, limit, page }),
    };
  },

  async getSubscriptionDetails({ params }) {
    const { subscriptionId } = params;

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: {
        lessons: true,
        ledgerTransactions: true
      }
    })

    if (!subscription) throw ApiError.NotFound("Subscription")

    return subscription
  },

  async deleteSubscription({ params }) {
    const { subscriptionId } = params;

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    })

    if (!subscription) throw ApiError.NotFound("Subscription")

    return prisma.subscription.delete({
      where: {
        id: subscriptionId,
      },
    });
  },

  async cancelSubscription({ params }) {
    const { subscriptionId } = params;

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    })

    if (!subscription) throw ApiError.NotFound("Subscription")

    return prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        subscriptionStatus: "CANCELED",
        lessons: { deleteMany: { lessonStatus: "SCHEDULED" } }
      },
    });
  },

  async recalculateSubscriptionStatus({ subscriptionId, tx }) {
    const subscription = await tx.subscription.findUnique({
      where: { id: subscriptionId },
      include: {
        ledgerTransactions: true,
        lessons: true,
        financialAccount: true
      }
    })

    if (!subscription) throw ApiError.NotFound("Subscription")

    const totalLessons = subscription.totalSessions

    const { SCHEDULED, COMPLETED, CANCELED_CHARGED } = getLessonStats(subscription.lessons)

    const isCanceled = subscription.subscriptionStatus === "CANCELED"

    const financialAccountId = subscription.financialAccount?.id
    const ledgerTransactions = subscription.ledgerTransactions
    const balance = calculateAccountBalance({ financialAccountId, ledgerTransactions })

    const subscriptionStatus = getSubscriptionStatus({
      usedLessons: COMPLETED + CANCELED_CHARGED,
      isCanceled,
      totalPaid: balance,
      requiredInitialDeposit: subscription.requiredInitialDeposit,
      subscriptionPrice: subscription.priceAtBooking,
      sessionsBeforeFullPayment: subscription.sessionsBeforeFullPayment,
      totalLessons,
      scheduledLessons: SCHEDULED
    })

    return tx.subscription.update({ where: { id: subscription.id }, data: { subscriptionStatus } })
  },
};

export default SubscriptionService;