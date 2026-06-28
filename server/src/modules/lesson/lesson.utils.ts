import { AcademyCountOutputTypeCountAreasArgs } from './../../../prisma/generated/models/Academy';
import dayjs from "dayjs";
import { LessonStatus, SubscriptionStatus, Transmission } from "../../../prisma/generated/enums";
import { LessonWhereInput } from "../../../prisma/generated/models";
import ApiError from "../../shared/utils/ApiError";
import { Lesson } from "../../../prisma/generated/client";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";

// export const calculateLessonTime = (
//   startTime: Date | string,
//   durationMinutes: number,
// ) => {
//   const start = dayjs(startTime);

//   const end = start.add(durationMinutes, "minute");

//   return {
//     startTime: start.toDate(),
//     endTime: end.toDate(),
//   };
// };

// export const buildLessonWhere = ({
//   search,
//   academyId,
//   status,
//   transmission,
// }: {
//   search?: string;
//   status?: LessonStatus;
//   academyId: string;
//   transmission?: Transmission;
// }): LessonWhereInput => {
//   const where: LessonWhereInput = { academyId };

//   if (search) {
//     where.OR = [
//       { client: { name: { contains: search, mode: "insensitive" } } },
//       { client: { phone: { contains: search, mode: "insensitive" } } },
//     ];
//   }

//   if (status) {
//     where.status = status;
//   }

//   if (transmission) {
//     where.transmission = transmission;
//   }

//   return where;
// };

// export const getBookingError = (
//   status: SubscriptionStatus,
//   lessons: Lesson[],
//   sessionsBeforeFullPayment: number
// ): void => {

//   switch (status) {
//     case "PENDING_DEPOSIT":
//       throw ApiError.BadRequest("لا يمكن جدولة حصة جديدة؛ يرجى إتمام عملية الدفع المطلوبة لتفعيل الاشتراك.");

//     case "CANCELED":
//       throw ApiError.BadRequest("لا يمكن جدولة حصة جديدة؛ هذا الاشتراك تم إلغاؤه مسبقاً.");

//     case "COMPLETED":
//       throw ApiError.BadRequest("لا يمكن جدولة حصة جديدة؛ لقد اكتملت جميع الحصص الخاصة بهذا الاشتراك.");
//   }

//   if (status === "ACTIVE_LIMITED") {
//     const activeLessonsCount = lessons.filter((l) => l.status !== "CANCELED").length;

//     if (activeLessonsCount >= sessionsBeforeFullPayment) {
//       throw ApiError.BadRequest("لا يمكن جدولة حصة جديدة؛ لقد استنفدت عدد الحصص المسموح بها قبل إكمال مبلغ الاشتراك.");
//     }
//   }
// };

// export const validateTimeSlotConflict = async ({
//   id,
//   tx,
//   startTime,
//   endTime,
//   clientId,
//   carId,
//   captainId,
// }: {
//   captainId: string;
//   carId: string;
//   clientId: string;
//   startTime: Date;
//   endTime: Date;
//   id?: string;
//   tx: TransactionClient
// }) => {
//   const conflictingLesson = await tx.lesson.findFirst({
//     where: {
//       status: "SCHEDULED",
//       startTime: { lt: endTime },
//       endTime: { gt: startTime },
//       OR: [
//         { captainId: captainId },
//         { carId: carId },
//         { clientId: clientId }
//       ],
//       ...(id && { id: { not: id } }),
//     },
//   });

//   if (conflictingLesson) {
//     if (conflictingLesson.captainId === captainId) throw ApiError.Conflict("CaptainTimeConflict");
//     if (conflictingLesson.carId === carId) throw ApiError.Conflict("CarTimeConflict");
//     throw ApiError.Conflict("ClientTimeConflict");
//   }
// };

export const getLessonStats = (lessons: Lesson[]) => {
  const result: Record<LessonStatus, number> = {
    CANCELED: 0,
    CANCELED_CHARGED: 0,
    COMPLETED: 0,
    SCHEDULED: 0,
  };

  for (const lesson of lessons) {
    result[lesson.lessonStatus]++;
  }

  return result;
};