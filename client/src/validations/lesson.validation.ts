import z from "zod";

import {
  id,
  limit,
  positiveNumber,
  futureDate,
  lessonStatus,
  transmission,
  paymentMethod,
  price,
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
});

// ================== DETAILS ==================
export const GetLessonDetailsSchema = z.object({
  academyId: id,
  lessonId: id,
});

// ================== UPDATE ==================
export const UpdateLessonSchema = z.object({
  academyId: id,
  lessonId: id,

  startTime: futureDate.optional(),
  captainId: id.optional(),
  carId: id.optional(),
  areaId: id.optional(),
  expectedAmount: price.optional(),
  transmission: transmission.optional(),
});

// ================== CHANGE STATUS ==================
export const ChangeLessonStateSchema = z.object({
  academyId: id,
  lessonId: id,

  status: lessonStatus,
  amount: price.optional(),
  paymentMethod: paymentMethod.optional(),
});
