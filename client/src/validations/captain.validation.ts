import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  trainingSupport,
  boolean,
  phone,
  transmission,
  date,
  price
} from "@/validations/common.validation";

export const CreateCaptainSchema = z.object({
  phone: phone,
  captainLessonPrice: price,
  trainingType: trainingSupport,
});

export const UpdateCaptainSchema = z.object({
  captainLessonPrice: price.optional(),
  trainingType: trainingSupport.optional(),
  isActive: boolean.optional(),
});

export const GetAllCaptainsSchema = z.object({
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
  search: z.string().optional(),
});

export const GetCaptainDetailsSchema = z.object({
  id,
});

export const DeleteCaptainSchema = z.object({
  id,
});

export const FilterCaptainsSchema = z.object({
  type: transmission.optional(),
});

export const GetCaptainScheduleSchema = z.object({
  id,
  date,
});
