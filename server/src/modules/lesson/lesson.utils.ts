import dayjs from "dayjs";
import { LessonStatus, Transmission } from "../../../prisma/generated/enums";
import { LessonWhereInput } from "../../../prisma/generated/models";

export const calculateLessonTime = (
  startTime: Date | string,
  durationMinutes: number,
) => {
  const start = dayjs(startTime);

  const end = start.add(durationMinutes, "minute");

  return {
    startTime: start.toDate(),
    endTime: end.toDate(),
  };
};

export const subscriptionErrors = {
  FULLYBOOKED:
    "لا يمكن جدولة حصة جديدة، لقد تم حجز جميع الحصص المتاحة في هذا الاشتراك.",
  PAUSED:
    "لا يمكن جدولة حصة جديدة لأن الاشتراك موقوف حالياً. يرجى مراجعة المدفوعات أو التواصل مع الإدارة.",
  COMPLETED: "لا يمكن جدولة حصة جديدة لأن جميع حصص الاشتراك قد اكتملت.",
  CANCELED: "لا يمكن جدولة حصة جديدة لأن هذا الاشتراك تم إلغاؤه.",
} as const;

export const buildLessonWhere = ({
  search,
  academyId,
  status,
  transmission,
}: {
  search?: string;
  status?: LessonStatus;
  academyId: string;
  transmission?: Transmission;
}): LessonWhereInput => {
  const where: LessonWhereInput = { academyId };

  if (search) {
    where.OR = [
      { client: { name: { contains: search, mode: "insensitive" } } },
      { client: { phone: { contains: search, mode: "insensitive" } } },
    ];
  }

  if (status) {
    where.status = status;
  }

  if (transmission) {
    where.transmission = transmission;
  }

  return where;
};
