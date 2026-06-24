import z from "zod";

import {
  id,
  limit,
  positiveNumber,
  futureDate,
  lessonStatus,
  transmission,
  price,
  paymentMethod,
} from "../../shared/utils/common.validation";

export const CreateLessonSchema = {
  params: z.object({
    academyId: id,
  }),
  body: z.object({
    startTime: futureDate,
    transmission: transmission,
    expectedAmount: price,
    captainId: id,
    carId: id,
    areaId: id,
    subscriptionId: id,
  }),
};

export const GetAllLessonsSchema = {
  params: z.object({
    academyId: id,
  }),
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    transmission: transmission.optional(),
    status: lessonStatus.optional(),
    search: z.string().optional(),
  }),
};

export const GetLessonDetailsSchema = {
  params: z.object({
    academyId: id,
    lessonId: id,
  }),
};

export const ChangeLessonStateSchema = {
  params: z.object({ lessonId: id, academyId: id }),
  body: z.object({
    status: lessonStatus,
    amount: price.optional(),
  }),
};

export const UpdateLessonSchema = {
  params: z.object({
    academyId: id,
    lessonId: id,
  }),
  body: z.object({
    startTime: futureDate,
    transmission: transmission,
    expectedAmount: price,
    captainId: id,
    carId: id,
    areaId: id,
  }),
};