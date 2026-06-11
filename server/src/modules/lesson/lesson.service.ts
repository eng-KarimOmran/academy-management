import * as DTO from "./lesson.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { LessonCreateInput, LessonUpdateInput, PaymentTransactionCreateInput, PaymentTransactionWhereInput } from "../../../prisma/generated/models";
import { prisma } from "../../lib/prisma";
import { buildLessonWhere, calculateLessonTime, subscriptionErrors } from "./lesson.utils";

import LessonRepository from "./lesson.repository";
import LedgerRepository from "../ledger/ledger.repository";
import CaptainRepository from "../captain/captain.repository";
import CarRepository from "../car/car.repository";
import AreaRepository from "../area/area.repository";
import SubscriptionRepository from "../subscription/subscription.repository";
import PaymentTransactionRepository from "../paymentTransaction/paymentTransaction.repository";

const LessonService = {
  async create(dataSafe: DTO.CreateLessonDto) {
    const { body, params } = dataSafe;
    const { academyId } = params;
    const { areaId, captainId, carId, subscriptionId, expectedAmount, transmission } = body;

    const subscription = await SubscriptionRepository.findById({ id: subscriptionId });
    if (!subscription) throw ApiError.NotFound({ model: "Subscription" });
    if (subscription.status !== "ACTIVE") {
      throw ApiError.BadRequest(subscriptionErrors[subscription.status]);
    }

    const captain = await CaptainRepository.findById({ captainId });
    if (!captain) throw ApiError.NotFound({ model: "Captain" });
    if (!captain.isActive) throw ApiError.Inactive("Captain");

    const car = await CarRepository.findById({ carId });
    if (!car) throw ApiError.NotFound({ model: "Car" });
    if (!car.isActive) throw ApiError.Inactive("Car");

    const area = await AreaRepository.findById({ areaId });
    if (!area) throw ApiError.NotFound({ model: "Area" });
    if (!area.isActive) throw ApiError.Inactive("Area");

    const { startTime, endTime } = calculateLessonTime(body.startTime, subscription.sessionDurationMinutes);

    const lessonConflict = await LessonRepository.validateLessonConflict({
      captainId,
      carId,
      clientId: subscription.clientId,
      startTime,
      endTime,
    });

    if (lessonConflict) {
      if (lessonConflict.captainId === captainId) throw ApiError.Conflict("CaptainTimeConflict");
      if (lessonConflict.carId === carId) throw ApiError.Conflict("CarTimeConflict");
      throw ApiError.Conflict("ClientTimeConflict");
    }

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

    const lesson = await LessonRepository.create({ data });
    await SubscriptionRepository.recalculateSubscriptionStatus({ id: subscriptionId });

    return lesson;
  },

  async getAll(dataSafe: DTO.GetAllLessonsDto) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { limit, page, status, transmission, search } = query;

    const where = buildLessonWhere({ search, academyId, status, transmission });
    const { take, skip } = getPagination({ page, limit });

    const { lessons, count } = await LessonRepository.findMany({
      where,
      take,
      skip,
      orderBy: { startTime: "asc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    return { items: lessons, pagination };
  },

  async getDetails(dataSafe: DTO.GetLessonDetailsDto) {
    const { lessonId } = dataSafe.params;

    const lesson = await LessonRepository.findById({ id: lessonId });
    if (!lesson) throw ApiError.NotFound({ model: "Lesson" });

    return lesson;
  },

  async changeLessonState({ dataSafe, userId, proofOfPaymentImageId }: { dataSafe: DTO.ChangeLessonStateDto; userId: string; proofOfPaymentImageId?: string }) {
    const { body, params } = dataSafe;
    const { lessonId } = params;
    const { status, amount, paymentMethod = "CASH" } = body;

    const lessonEx = await LessonRepository.findById({ id: lessonId });
    if (!lessonEx) throw ApiError.NotFound({ model: "Lesson" });

    const lesson = await prisma.$transaction(async (tx) => {
      const isSettledStatus = ["COMPLETED", "CANCELED_CHARGED"].includes(status);

      if (!isSettledStatus && lessonEx.isPaid) {
        await tx.ledgerTransaction.deleteMany({
          where: { referenceId: lessonEx.id, referenceCategory: "lessonId" }
        });
        await LessonRepository.update({
          id: lessonEx.id,
          data: { status, isPaid: false },
          tx,
        });
      }
      else if (isSettledStatus && !lessonEx.isPaid) {
        await LessonRepository.update({
          id: lessonEx.id,
          data: { status, isPaid: true },
          tx,
        });

        await LedgerRepository.create({
          data: {
            amount: lessonEx.captainLessonPrice,
            category: "TO_USER",
            notes: `مستحق حصة رقم: ${lessonEx.id}`,
            referenceId: lessonEx.id,
            referenceCategory: "lessonId",
            academy: { connect: { id: lessonEx.academy.id } },
            user: { connect: { id: lessonEx.captain.userId } },
          },
          tx,
        });
      }
      else {
        await LessonRepository.update({ id: lessonEx.id, data: { status }, tx });
      }

      if (amount) {
        const data: PaymentTransactionCreateInput = {
          amount,
          paymentMethod,
          status: paymentMethod === "CASH" ? "COMPLETED" : "PENDING",
          type: "PAYMENT",
          ...(proofOfPaymentImageId && {
            proofOfPaymentImage: { connect: { id: proofOfPaymentImageId } },
          }),
          academy: { connect: { id: lessonEx.academy.id } },
          client: { connect: { id: lessonEx.client.id } },
          receiver: { connect: { id: userId } },
          subscription: { connect: { id: lessonEx.subscriptionId } },
        }
        await PaymentTransactionRepository.create({ data, tx });
      }

      return await LessonRepository.findById({ id: lessonEx.id, tx });
    });

    await SubscriptionRepository.recalculateSubscriptionStatus({ id: lessonEx.subscriptionId });
    return lesson;
  },

  async update(dataSafe: DTO.UpdateLessonDto) {
    const { body, params } = dataSafe;
    const { lessonId } = params;
    const { areaId, captainId, carId, expectedAmount, transmission } = body;

    const lessonEx = await LessonRepository.findById({ id: lessonId });
    if (!lessonEx) throw ApiError.NotFound({ model: "Lesson" });

    const lockedStatuses = ["COMPLETED", "CANCELED_CHARGED"];
    if (lockedStatuses.includes(lessonEx.status)) {
      throw ApiError.BadRequest(
        "لا يمكن تعديل بيانات هذه الحصة لأنها في حالة مغلقة ماليًا (مكتملة أو ملغية برسوم). التعامل المالي يتم فقط عبر تغيير الحالة."
      );
    }

    const subscription = await SubscriptionRepository.findById({ id: lessonEx.subscriptionId });
    if (!subscription) throw ApiError.NotFound({ model: "Subscription" });

    const captain = await CaptainRepository.findById({ captainId });
    if (!captain) throw ApiError.NotFound({ model: "Captain" });
    if (!captain.isActive) throw ApiError.Inactive("Captain");

    const car = await CarRepository.findById({ carId });
    if (!car) throw ApiError.NotFound({ model: "Car" });
    if (!car.isActive) throw ApiError.Inactive("Car");

    const area = await AreaRepository.findById({ areaId });
    if (!area) throw ApiError.NotFound({ model: "Area" });
    if (!area.isActive) throw ApiError.Inactive("Area");

    const { startTime, endTime } = calculateLessonTime(body.startTime, subscription.sessionDurationMinutes);

    const lessonConflict = await LessonRepository.validateLessonConflict({
      captainId,
      carId,
      clientId: subscription.clientId,
      startTime,
      endTime,
    });

    if (lessonConflict) {
      if (lessonConflict.captainId === captainId) throw ApiError.Conflict("CaptainTimeConflict");
      if (lessonConflict.carId === carId) throw ApiError.Conflict("CarTimeConflict");
      throw ApiError.Conflict("ClientTimeConflict");
    }

    const data: LessonUpdateInput = {
      expectedAmount,
      transmission,
      startTime,
      endTime,
      car: { connect: { id: carId } },
      captain: { connect: { id: captainId } },
      area: { connect: { id: areaId } },
    };

    return await LessonRepository.update({ id: lessonEx.id, data });
  }
}

export default LessonService;