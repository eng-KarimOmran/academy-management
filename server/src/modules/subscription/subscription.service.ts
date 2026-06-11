import * as DTO from "./subscription.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { buildSubscriptionWhere } from "./subscription.utils";
import { subscriptionDetailsSelect } from "./subscription.selectors";
import { prisma } from "../../lib/prisma";
import SubscriptionRepository from "./subscription.repository";
import { SubscriptionCreateInput } from "../../../prisma/generated/models";
import CourseRepository from "../course/course.repository";
import ClientRepository from "../client/client.repository";
import AreaRepository from "../area/area.repository";

const SubscriptionService = {
  async create({ userId, dataSafe }: { userId: string; dataSafe: DTO.CreateSubscriptionDto }) {
    const { body, params } = dataSafe;
    const { academyId } = params;
    const { phone, courseId, trainingTypeAtRegistration, areaId } = body;

    const course = await CourseRepository.findCourseById({ id: courseId });
    if (!course) throw ApiError.NotFound({ model: "Course" });

    const client = await ClientRepository.findByPhone({ phone, academyId });
    if (!client) throw ApiError.NotFound({ model: "Client" });

    const area = await AreaRepository.findById({ areaId });
    if (!area) throw ApiError.NotFound({ model: "Area" });

    const data: SubscriptionCreateInput = {
      trainingTypeAtRegistration,
      priceAtBooking: course.priceDiscounted ?? course.priceOriginal,
      sessionDurationMinutes: course.sessionDurationMinutes,
      totalSessions: course.totalSessions,
      status: "PAUSED",
      client: { connect: { id: client.id } },
      course: { connect: { id: course.id } },
      area: { connect: { id: area.id } },
      createdBy: { connect: { id: userId } },
      academy: { connect: { id: academyId } },
    };

    return await SubscriptionRepository.create({ data });
  },

  async getAll(dataSafe: DTO.GetAllSubscriptionsDto) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { limit, page, search, status } = query;

    const where = buildSubscriptionWhere({ search, status, academyId });
    const { take, skip } = getPagination({ page, limit });

    const { count, subscriptions } = await SubscriptionRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, count, totalPages };

    return { items: subscriptions, pagination };
  },

  async getDetails(dataSafe: DTO.GetSubscriptionDetailsDto) {
    const { subscriptionId } = dataSafe.params;

    const subscription = await SubscriptionRepository.findById({
      id: subscriptionId,
      select: subscriptionDetailsSelect,
    });

    if (!subscription) throw ApiError.NotFound({ model: "Subscription" });

    return subscription;
  },

  async deleteSubscription(dataSafe: DTO.DeleteSubscriptionDto) {
    const { subscriptionId } = dataSafe.params;

    const subscriptionEx = await SubscriptionRepository.findById({ id: subscriptionId });
    if (!subscriptionEx) throw ApiError.NotFound({ model: "Subscription" });

    return await SubscriptionRepository.delete({ id: subscriptionId });
  },

  async cancel(dataSafe: DTO.CancelSubscriptionDto) {
    const { params } = dataSafe;
    const { subscriptionId } = params;

    const subscriptionEx = await SubscriptionRepository.findById({ id: subscriptionId });
    if (!subscriptionEx) throw ApiError.NotFound({ model: "Subscription" });

    return await prisma.$transaction(async (tx) => {
      return await SubscriptionRepository.update({
        id: subscriptionId,
        data: {
          status: "CANCELED",
          lessons: {
            deleteMany: {
              status: "SCHEDULED"
            },
          },
        },
        tx,
      });
    });
  }
};

export default SubscriptionService;