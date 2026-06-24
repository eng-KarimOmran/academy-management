import { CaptainBaseSelect } from './../captain/captain.selectors';
import { areaBaseSelect } from './../area/area.selectors';
import { carBaseSelect } from './../car/car.selectors';
import * as DTO from "./lesson.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { Prisma, Lesson } from "../../../prisma/generated/client";
import { prisma } from "../../lib/prisma";
import { buildLessonWhere, calculateLessonTime, getBookingError, validateTimeSlotConflict } from "./lesson.utils";
import { subscriptionDetailsSelect } from '../subscription/subscription.selectors';
import { TransactionClient } from '../../../prisma/generated/internal/prismaNamespace';
import { lessonBaseSelect } from './lesson.selectors';
import LedgerTransactionService from '../ledgerTransaction/ledgerTransaction.service';
import { CreateLedgerTransactionDto } from '../ledgerTransaction/ledgerTransaction.dto';

interface ILessonService {
  create: (data: { dataSafe: DTO.CreateLessonDto; tx?: TransactionClient }) => Promise<Lesson>;
  getAll: (data: { dataSafe: DTO.GetAllLessonsDto; tx?: TransactionClient }) => Promise<{ items: Lesson[]; pagination: { limit: number; page: number; totalPages: number; total: number } }>;
  getDetails: (data: { dataSafe: DTO.GetLessonDetailsDto; tx?: TransactionClient }) => Promise<Lesson>;
  changeLessonState: (data: { dataSafe: DTO.ChangeLessonStateDto; userId: string; tx?: TransactionClient }) => Promise<Lesson>;
  update: (data: { dataSafe: DTO.UpdateLessonDto; tx?: TransactionClient }) => Promise<Lesson>;
}

const LessonService: ILessonService = {
  async create({ dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { academyId } = params;
    const { areaId, captainId, carId, subscriptionId, expectedAmount, transmission } = body;

    const run = async (tx: TransactionClient) => {
      const [subscription, car, area, captain] = await Promise.all([
        tx.subscription.findUnique({ where: { id: subscriptionId }, select: subscriptionDetailsSelect }),
        tx.car.findUnique({ where: { id: carId }, select: carBaseSelect }),
        tx.area.findUnique({ where: { id: areaId }, select: areaBaseSelect }),
        tx.captain.findUnique({ where: { id: captainId }, select: CaptainBaseSelect })
      ]);

      if (!subscription) throw ApiError.NotFound({ model: "Subscription" });
      if (!captain) throw ApiError.NotFound({ model: "Captain" });
      if (!car) throw ApiError.NotFound({ model: "Car" });
      if (!area) throw ApiError.NotFound({ model: "Area" });

      if (!car.isActive) throw ApiError.Inactive("Car");
      if (!area.isActive) throw ApiError.Inactive("Area");
      if (!captain.isActive) throw ApiError.Inactive("Captain");

      getBookingError(subscription.status, subscription.lessons, subscription.sessionsBeforeFullPayment);

      const { startTime, endTime } = calculateLessonTime(body.startTime, subscription.sessionDurationMinutes);

      await validateTimeSlotConflict({ captainId, carId, startTime, endTime, clientId: subscription.client.id, tx });

      const data: Prisma.LessonCreateInput = {
        expectedAmount,
        transmission,
        status: "SCHEDULED",
        captainLessonPrice: captain.captainLessonPrice,
        carSessionPrice: car.carSessionPrice,
        startTime,
        endTime,
        area: { connect: { id: areaId } },
        car: { connect: { id: carId } },
        captain: { connect: { id: captainId } },
        subscription: { connect: { id: subscriptionId } },
        academy: { connect: { id: academyId } },
        client: { connect: { id: subscription.client.id } },
      };

      return await tx.lesson.create({ data, select: lessonBaseSelect });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getAll({ dataSafe, tx }) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { limit, page, status, transmission, search } = query;

    const run = async (tx: TransactionClient) => {
      const where = buildLessonWhere({ search, academyId, status, transmission });
      const { take, skip } = getPagination({ page, limit });

      const [lessons, count] = await Promise.all([
        tx.lesson.findMany({
          where,
          take,
          skip,
          orderBy: { startTime: "asc" },
          select: lessonBaseSelect
        }),
        tx.lesson.count({ where })
      ]);

      const totalPages = getTotalPages({ limit, count });
      const pagination = { limit, page, totalPages, total: count };

      return { items: lessons, pagination };
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getDetails({ dataSafe, tx }) {
    const { lessonId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const lesson = await tx.lesson.findUnique({ where: { id: lessonId }, select: lessonBaseSelect });
      if (!lesson) throw ApiError.NotFound({ model: "Lesson" });
      return lesson;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async changeLessonState({ dataSafe, userId, tx }) {
    const { body, params } = dataSafe;
    const { lessonId } = params;
    const { status, amount } = body;

    const run = async (tx: TransactionClient) => {

      const lessonEx = await tx.lesson.findUnique({
        where: { id: lessonId },
        select: lessonBaseSelect
      });

      if (!lessonEx) throw ApiError.NotFound({ model: "Lesson" });

      const updatedLesson = await tx.lesson.update({
        where: { id: lessonId },
        data: { status },
        select: lessonBaseSelect
      });

      if (amount) {
        const dataSafe: CreateLedgerTransactionDto = {
          params: { academyId: updatedLesson.academy.id },
          body: { amount, paymentMethod: "CASH", transactionType: "PAYMENT", senderType: "SUBSCRIPTION", senderId: updatedLesson.subscriptionId, receiverType: "USER", receiverId: userId }
        }

        await LedgerTransactionService.create({ dataSafe, tx })
      }

      return updatedLesson;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async update({ dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { lessonId } = params;
    const { areaId, captainId, carId, expectedAmount, transmission } = body;

    const run = async (tx: TransactionClient) => {
      const lessonEx = await tx.lesson.findUnique({ where: { id: lessonId } });
      if (!lessonEx) throw ApiError.NotFound({ model: "Lesson" });

      const [subscription, captain, car, area] = await Promise.all([
        tx.subscription.findUnique({ where: { id: lessonEx.subscriptionId } }),
        tx.captain.findUnique({ where: { id: captainId } }),
        tx.car.findUnique({ where: { id: carId } }),
        tx.area.findUnique({ where: { id: areaId } })
      ]);

      if (!subscription) throw ApiError.NotFound({ model: "Subscription" });

      if (!captain) throw ApiError.NotFound({ model: "Captain" });
      if (!captain.isActive) throw ApiError.Inactive("Captain");

      if (!car) throw ApiError.NotFound({ model: "Car" });
      if (!car.isActive) throw ApiError.Inactive("Car");

      if (!area) throw ApiError.NotFound({ model: "Area" });
      if (!area.isActive) throw ApiError.Inactive("Area");

      const { startTime, endTime } = calculateLessonTime(body.startTime, subscription.sessionDurationMinutes);

      await validateTimeSlotConflict({ captainId, carId, clientId: subscription.clientId, startTime, endTime, id: lessonEx.id, tx });

      const data: Prisma.LessonUpdateInput = {
        expectedAmount,
        transmission,
        startTime,
        endTime,
        car: { connect: { id: carId } },
        captain: { connect: { id: captainId } },
        area: { connect: { id: areaId } },
      };

      return await tx.lesson.update({ where: { id: lessonEx.id }, data });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  }
};

export default LessonService;