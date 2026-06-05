import { findAreaById } from "./../area/area.repository";
import { findCarById } from "./../car/car.repository";
import { findCaptainById } from "./../captain/captain.repository";
import * as DTO from "./lesson.dto";
import ApiError from "../../shared/utils/ApiError";

import { getPaginationParams } from "../../shared/utils/Pagination";

import {
  createLesson,
  findLessonById,
  findManyLessons,
  validateLessonConflict,
  updateLesson,
} from "./lesson.repository";

import {
  findSubscriptionById,
  recalculateSubscriptionStatus,
} from "../subscription/subscription.repository";

import * as ledgerTransaction from "../ledger/ledger.repository";

import {
  buildLessonWhere,
  calculateLessonTime,
  subscriptionErrors,
} from "./lesson.utils";
import { LessonCreateInput } from "../../../prisma/generated/models";
import { prisma } from "../../lib/prisma";

export const create = async (dataSafe: DTO.CreateLessonDto) => {
  const { body, params } = dataSafe;
  const { academyId } = params;

  const {
    areaId,
    captainId,
    carId,
    subscriptionId,
    expectedAmount,
    transmission,
  } = body;

  const subscription = await findSubscriptionById({ id: subscriptionId });
  if (!subscription) throw ApiError.NotFound({ model: "Subscription" });
  if (subscription.status !== "ACTIVE") {
    throw ApiError.BadRequest(subscriptionErrors[subscription.status]);
  }

  const captain = await findCaptainById(captainId);
  if (!captain) throw ApiError.NotFound({ model: "Captain" });
  if (!captain.isActive) throw ApiError.Inactive("Captain");

  const car = await findCarById(carId);
  if (!car) throw ApiError.NotFound({ model: "Car" });
  if (!car.isActive) throw ApiError.Inactive("Car");

  const area = await findAreaById(areaId);
  if (!area) throw ApiError.NotFound({ model: "Area" });
  if (!area.isActive) throw ApiError.Inactive("Area");

  const { startTime, endTime } = calculateLessonTime(
    body.startTime,
    subscription.sessionDurationMinutes,
  );

  const data: LessonCreateInput = {
    expectedAmount,
    transmission,
    status: "SCHEDULED",
    captainLessonPrice: captain.captainLessonPrice,
    carSessionPrice: car.carSessionPrice,
    startTime,
    endTime,
    isPaid: false,
    area: { connect: { id: areaId } },
    car: { connect: { id: carId } },
    captain: { connect: { id: captainId } },
    subscription: { connect: { id: subscriptionId } },
    academy: { connect: { id: academyId } },
    client: { connect: { id: subscription.client.id } },
  };

  const lessonConflict = await validateLessonConflict({
    captainId,
    carId,
    clientId: subscription.clientId,
    startTime,
    endTime,
  });

  if (lessonConflict) {
    if (lessonConflict.captainId === captainId) {
      throw ApiError.Conflict("CaptainTimeConflict");
    }

    if (lessonConflict.carId === carId) {
      throw ApiError.Conflict("CarTimeConflict");
    }

    throw ApiError.Conflict("ClientTimeConflict");
  }

  const lesson = await createLesson(data);

  await recalculateSubscriptionStatus({ id: subscriptionId });

  return lesson;
};

export const getAll = async (dataSafe: DTO.GetAllLessonsDto) => {
  const { query, params } = dataSafe;
  const { academyId } = params;
  const { limit, page, status, transmission, search } = query;

  const where = buildLessonWhere({ search, academyId, status, transmission });

  const { lessons, count } = await findManyLessons({
    where,
    take: limit,
    skip: Math.max(0, page - 1) * limit,
    orderBy: { startTime: "asc" },
  });

  const { safePage, totalPages } = getPaginationParams({
    limit,
    page,
    count,
  });

  const pagination = { limit, page: safePage, total: count, totalPages };

  return { items: lessons, pagination };
};

export const getDetails = async (dataSafe: DTO.GetLessonDetailsDto) => {
  const { lessonId } = dataSafe.params;

  const lesson = await findLessonById(lessonId);

  if (!lesson) throw ApiError.NotFound({ model: "Lesson" });
  return lesson;
};

export const changeState = async (dataSafe: DTO.ChangeLessonStateDto) => {
  const { body, params } = dataSafe;
  const { lessonId } = params;
  const { status } = body;

  const lessonEx = await findLessonById(lessonId);
  if (!lessonEx) throw ApiError.NotFound({ model: "Lesson" });

  if (["COMPLETED", "CANCELED_CHARGED"].includes(lessonEx.status)) {
    throw ApiError.BadRequest("لا يمكن تعديل حالة الحصة بعد اكملها");
  }

  const lesson = await prisma.$transaction(async (tx) => {
    if (
      ["COMPLETED", "CANCELED_CHARGED"].includes(status) &&
      !lessonEx.isPaid
    ) {
      const lesson = await updateLesson({
        id: lessonEx.id,
        data: {
          status,
          isPaid: true,
        },
        tx,
      });
      await ledgerTransaction.create(
        {
          amount: lessonEx.captainLessonPrice,
          category: "TO_USER",
          ledgerEffect: "CREDIT",
          notes: "مستحق حصص",
          referenceId: lessonEx.id,
          academy: { connect: { id: lessonEx.academy.id } },
          user: { connect: { id: lessonEx.captain.userId } },
        },
        tx,
      );

      return lesson;
    } else {
      return await updateLesson({ id: lessonEx.id, data: { status }, tx });
    }
  });

  await recalculateSubscriptionStatus({ id: lessonEx.subscriptionId });

  return lesson;
};