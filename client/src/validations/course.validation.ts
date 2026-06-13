import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  entityName,
  boolean,
  price,
  booleanQuery,
} from "../validations/common.validation";

export const CreateSchema = z.object({
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

export const UpdateSchema = z.object({
  courseId: id,
  academyId: id,
  name: entityName.optional(),
  description: z.string().optional(),
  priceOriginal: price.optional(),
  priceDiscounted: price.optional(),
  totalSessions: positiveNumber.optional(),
  practicalSessions: positiveNumber.optional(),
  sessionDurationMinutes: positiveNumber.optional(),
  featuredReason: z.string().optional(),
  isActive: boolean.optional(),
});

export const DeleteSchema = z.object({
  courseId: id,
  academyId: id,
});

export const GetAllSchema = z.object({
  academyId: id,
  page: positiveNumber.optional().default(1),
  limit: limit,
  search: z.string().optional(),
  isActive: booleanQuery.optional(),
});

export const GetDetailsSchema = z.object({
  courseId: id,
  academyId: id,
});

export const AddCourseFeaturesSchema = z.object({
  academyId: id,
  courseId: id,
  text: z.string(),
});

export const DeleteCourseFeaturesSchema = z.object({
  academyId: id,
  courseId: id,
  featureId: id,
});
