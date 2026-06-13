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
} from "@/validations/common.validation";

// ================== CREATE ==================
export const CreateLessonSchema = z.object({
  academyId: id,
  startTime: futureDate,
  transmission: transmission,
  captainId: id,
  carId: id,
  areaId: id,
  subscriptionId: id,
  expectedAmount: price,
});

// ================== GET ALL ==================
export const GetAllLessonsSchema = z.object({
  academyId: id,
  page: positiveNumber.optional().default(1),
  limit: limit,
  search: z.string().optional(),
});

// ================== DETAILS ==================
export const GetLessonDetailsSchema = z.object({
  academyId: id,
  lessonId: id,
});

// ================== CHANGE STATUS ==================
export const ChangeLessonStateSchema = z.object({
  academyId: id,
  lessonId: id,
  status: lessonStatus,
  paymentMethod: paymentMethod.optional(),
  amount: price.optional(),
});