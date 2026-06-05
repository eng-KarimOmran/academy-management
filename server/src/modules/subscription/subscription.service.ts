import { getPaginationParams } from './../../shared/utils/Pagination';
import { findAreaById } from "./../area/area.repository";
import { findClientByPhone } from "./../client/client.repository";
import * as DTO from "./subscription.dto";

import {
  createSubscription,
  findManySubscriptions,
  findSubscriptionById,
  remove,
  updateSubscription,
} from "./subscription.repository";

import { findCourseById } from "../course/course.repository";
import { buildSubscriptionWhere } from "./subscription.utils";
import { subscriptionDetailsSelect } from "./subscription.selectors";
import dayjs from "dayjs";
import ApiError from "../../shared/utils/ApiError";

export const create = async ({
  userId,
  dataSafe,
}: {
  userId: string;
  dataSafe: DTO.CreateSubscriptionDto;
}) => {
  const { body, params } = dataSafe;
  const { academyId } = params;
  const { phone, courseId, trainingTypeAtRegistration, areaId } = body;

  const course = await findCourseById({ id: courseId });
  if (!course) throw ApiError.NotFound({ model: "Course" });

  const client = await findClientByPhone({ phone, academyId });
  if (!client) throw ApiError.NotFound({ model: "Client" });

  const area = await findAreaById(areaId);
  if (!area) throw ApiError.NotFound({ model: "Area" });

  return await createSubscription({
    trainingTypeAtRegistration,
    priceAtBooking: course.priceDiscounted ?? course.priceOriginal,
    sessionDurationMinutes: course.sessionDurationMinutes,
    totalSessions: course.totalSessions,
    client: { connect: { id: client.id } },
    course: { connect: { id: course.id } },
    area: { connect: { id: area.id } },
    createdBy: { connect: { id: userId } },
    academy: { connect: { id: academyId } },
  });
};

export const getAll = async (dataSafe: DTO.GetAllSubscriptionsDto) => {
  const { query, params } = dataSafe;
  const { academyId } = params;
  const { limit, page, search, status } = query;

  const where = buildSubscriptionWhere({ search, status, academyId });

  const { count, subscriptions } = await findManySubscriptions({
    where,
    take: limit,
    skip: Math.min(0, page - 1) * limit,
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({
    limit,
    page,
    count,
  });

  const pagination = { limit, page: safePage, count, totalPages };

  return { items: subscriptions, pagination };
};

export const getDetails = async (dataSafe: DTO.GetSubscriptionDetailsDto) => {
  const { subscriptionId } = dataSafe.params;

  const subscription = await findSubscriptionById({
    id: subscriptionId,
    select: subscriptionDetailsSelect,
  });


  if (!subscription) throw ApiError.NotFound({ model: "Subscription" });

  return subscription;
};

export const deleteSubscription = async (
  dataSafe: DTO.DeleteSubscriptionDto,
) => {
  const { subscriptionId } = dataSafe.params;

  const subscription = await remove(subscriptionId);

  return subscription;
};

export const cancel = async (dataSafe: DTO.CancelSubscriptionDto) => {
  const { params } = dataSafe;
  const { subscriptionId } = params;

  const tomorrowStart = dayjs().add(1, "day").startOf("day").toDate();

  const subscription = await updateSubscription({
    id: subscriptionId,
    data: {
      status: "CANCELED",
      lessons: {
        deleteMany: {
          startTime: {
            gt: tomorrowStart,
          },
        },
      },
    },
  });

  return subscription;
}