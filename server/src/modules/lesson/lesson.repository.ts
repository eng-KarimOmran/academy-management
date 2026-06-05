import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  LessonCreateInput,
  LessonOrderByWithRelationInput,
  LessonUpdateInput,
  LessonWhereInput,
} from "../../../prisma/generated/models";
import { prisma } from "../../lib/prisma";
import { lessonBaseSelect } from "./lesson.selectors";

export const createLesson = async (data: LessonCreateInput) => {
  const lesson = await prisma.lesson.create({
    data,
    select: lessonBaseSelect,
  });
  return lesson;
};

export const findLessonById = async (id: string) => {
  return await prisma.lesson.findUnique({
    where: { id },
    select: lessonBaseSelect,
  });
};

export const updateLesson = async ({
  id,
  data,
  tx,
}: {
  id: string;
  data: LessonUpdateInput;
  tx?: TransactionClient;
}) => {
  const client = tx ?? prisma;

  const lesson = await client.lesson.update({
    where: { id },
    data,
    select: lessonBaseSelect,
  });

  return lesson;
};

export const deleteLesson = async (id: string) => {
  return await prisma.lesson.delete({
    where: { id },
    select: lessonBaseSelect,
  });
};

export const findManyLessons = async (data: {
  where: LessonWhereInput;
  skip: number;
  take: number;
  orderBy: LessonOrderByWithRelationInput;
}) => {
  const [lessons, count] = await prisma.$transaction([
    prisma.lesson.findMany({ ...data, select: lessonBaseSelect }),
    prisma.lesson.count({ where: data.where }),
  ]);

  return { lessons, count };
};

export const validateLessonConflict = async ({
  captainId,
  carId,
  clientId,
  startTime,
  endTime,
}: {
  captainId: string;
  carId: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
}) => {
  return await prisma.lesson.findFirst({
    where: {
      status: "SCHEDULED",
      startTime: { lt: endTime },
      endTime: { gt: startTime },
      OR: [{ captainId }, { carId }, { clientId }],
    },
  });
};
