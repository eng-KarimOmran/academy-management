import z from "zod";

import {
  id,
  limit,
  positiveNumber,
  entityName,
  boolean,
  price,
} from "@/validations/common.validation";

export const CreateCourseSchema = z.object({
  academyId: id,
  name: entityName,
  description: z.string(),
  priceOriginal: price,
  priceDiscounted: price,
  totalSessions: positiveNumber,
  practicalSessions: positiveNumber,
  sessionDurationMinutes: positiveNumber,
  featuredReason: z.string().optional(),
});

export const UpdateCourseSchema = z.object({
  id,
  academyId: id,
  name: entityName.optional(),
  description: z.string().optional(),
  priceOriginal: price.optional(),
  priceDiscounted: price.optional(),
  totalSessions: positiveNumber.optional(),
  practicalSessions: positiveNumber.optional(),
  sessionDurationMinutes: positiveNumber.optional(),
  trainingDetails: z.array(z.string()).optional(),
  featuredReason: z.string().optional(),
  isActive: boolean.optional(),
});

export const DeleteCourseSchema = z.object({
  academyId: id,
  id,
});

export const GetAllCoursesSchema = z.object({
  academyId: id,
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
  search: z.string().optional(),
});

export const GetCourseDetailsSchema = z.object({
  academyId: id,
  id,
});

export const FilterCoursesSchema = z.object({
  academyId: id,
  type: z.string().optional(),
});
