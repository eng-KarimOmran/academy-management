import { ledgerTransactionBaseSelect } from './../ledgerTransaction/ledgerTransaction.selectors';
import * as DTO from "./subscription.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { buildSubscriptionWhere, getSubscriptionStatus } from "./subscription.utils";
import { subscriptionBaseSelect, subscriptionDetailsSelect } from "./subscription.selectors";
import { prisma } from "../../lib/prisma";
import { LedgerTransaction, LessonStatus, Prisma, Subscription } from "../../../prisma/generated/client";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";

interface ISubscriptionService {
  create: (data: { userId: string; dataSafe: DTO.CreateSubscriptionDto; tx?: TransactionClient }) => Promise<Subscription>;
  getAll: (data: { dataSafe: DTO.GetAllSubscriptionsDto; tx?: TransactionClient }) => Promise<{ items: Subscription[]; pagination: { limit: number; page: number; totalPages: number; count: number } }>;
  getDetails: (data: { dataSafe: DTO.GetSubscriptionDetailsDto; tx?: TransactionClient }) => Promise<{ subscription: Subscription, ledgerTransactions: LedgerTransaction[] }>;
  delete: (data: { dataSafe: DTO.DeleteSubscriptionDto; tx?: TransactionClient }) => Promise<Subscription>;
  cancel: (data: { dataSafe: DTO.CancelSubscriptionDto; tx?: TransactionClient }) => Promise<Subscription>;
  recalculateSubscriptionStatus: (data: { subscriptionId: string, tx?: TransactionClient }) => Promise<Subscription>;
}

const SubscriptionService: ISubscriptionService = {
  async create({ userId, dataSafe, tx }) {
    const { body } = dataSafe;
    const { clientId, courseId, trainingTypeAtRegistration, areaId } = body;

    const run = async (tx: TransactionClient) => {
      const [course, client, area] = await Promise.all([
        tx.course.findUnique({ where: { id: courseId } }),
        tx.client.findUnique({ where: { id: clientId } }),
        tx.area.findUnique({ where: { id: areaId } })
      ]);

      if (!course) throw ApiError.NotFound({ model: "Course" });
      if (!client) throw ApiError.NotFound({ model: "Client" });
      if (!area) throw ApiError.NotFound({ model: "Area" });


      const data: Prisma.SubscriptionCreateInput = {
        trainingTypeAtRegistration,
        priceAtBooking: course.priceDiscounted ?? course.priceOriginal,
        sessionDurationMinutes: course.sessionDurationMinutes,
        totalSessions: course.totalSessions,
        status: "PENDING_DEPOSIT",
        requiredInitialDeposit: course.requiredInitialDeposit,
        sessionsBeforeFullPayment: course.sessionsBeforeFullPayment,
        client: { connect: { id: client.id } },
        course: { connect: { id: course.id } },
        area: { connect: { id: area.id } },
        createdBy: { connect: { id: userId } },
        academy: { connect: { id: client.academyId } },
      };

      const subscription = await tx.subscription.create({ data });

      return subscription;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getAll({ dataSafe, tx }) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { limit, page, search, status } = query;

    const run = async (tx: TransactionClient) => {
      const where = buildSubscriptionWhere({ search, status, academyId });
      const { take, skip } = getPagination({ page, limit });

      const [subscriptions, count] = await Promise.all([
        tx.subscription.findMany({
          where,
          take,
          skip,
          orderBy: { createdAt: "desc" },
          select: subscriptionBaseSelect
        }),
        tx.subscription.count({ where })
      ]);

      const totalPages = getTotalPages({ limit, count });
      const pagination = { limit, page, count, totalPages };

      return { items: subscriptions, pagination };
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getDetails({ dataSafe, tx }) {
    const { subscriptionId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const subscription = await tx.subscription.findUnique({
        where: { id: subscriptionId },
        select: subscriptionDetailsSelect,
      });

      if (!subscription) throw ApiError.NotFound({ model: "Subscription" });

      const ledgerTransactions = await tx.ledgerTransaction.findMany({
        where: {
          OR: [
            { receiverId: subscriptionId },
            { senderId: subscriptionId }
          ]
        },
        select: ledgerTransactionBaseSelect
      });

      return { subscription, ledgerTransactions }
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async delete({ dataSafe, tx }) {
    const { subscriptionId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const subscriptionEx = await tx.subscription.findUnique({ where: { id: subscriptionId } });
      if (!subscriptionEx) throw ApiError.NotFound({ model: "Subscription" });

      return await tx.subscription.delete({ where: { id: subscriptionId } });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async cancel({ dataSafe, tx }) {
    const { params } = dataSafe;
    const { subscriptionId } = params;

    const run = async (tx: TransactionClient) => {
      const subscriptionEx = await tx.subscription.findUnique({ where: { id: subscriptionId } });
      if (!subscriptionEx) throw ApiError.NotFound({ model: "Subscription" });
      return await tx.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: "CANCELED",
          lessons: {
            deleteMany: {
              status: "SCHEDULED"
            },
          },
        },
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async recalculateSubscriptionStatus({ subscriptionId, tx }) {

    const run = async (tx: TransactionClient) => {
      const subscription = await tx.subscription.findUnique({
        where: { id: subscriptionId },
        select: subscriptionDetailsSelect,
      });

      if (!subscription) throw ApiError.NotFound({ model: "Subscription" });


      const [paymentAggregate, refundAggregate] = await Promise.all([
        tx.ledgerTransaction.aggregate({ where: { senderId: subscriptionId, senderType: "SUBSCRIPTION", transactionType: "PAYMENT" }, _sum: { amount: true } }),
        tx.ledgerTransaction.aggregate({ where: { receiverId: subscriptionId, receiverType: "SUBSCRIPTION", transactionType: "REFUND" }, _sum: { amount: true } })
      ])

      const payment = Number(paymentAggregate._sum.amount ?? 0);
      const refund = Number(refundAggregate._sum.amount ?? 0);

      const totalPaid = payment - refund

      const USED_STATUSES: LessonStatus[] = ["CANCELED_CHARGED", "COMPLETED"]

      const usedLessons = subscription.lessons.filter((s) => USED_STATUSES.includes(s.status)).length;

      const status = getSubscriptionStatus({
        requiredInitialDeposit: subscription.requiredInitialDeposit,
        subscriptionPrice: subscription.priceAtBooking,
        totalLessons: subscription.totalSessions,
        totalPaid,
        usedLessons,
        isCanceled: subscription.status === "CANCELED",
      })

      await tx.subscription.update({ where: { id: subscription.id }, data: { status } })

      return subscription
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },
};

export default SubscriptionService;