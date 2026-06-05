import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  entityName,
  boolean,
  price,
  booleanQuery,
} from "../../shared/utils/common.validation";

export const CreateSchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    name: entityName,
    description: z.string(),
    priceOriginal: price,
    priceDiscounted: price,
    totalSessions: positiveNumber,
    practicalSessions: positiveNumber,
    sessionDurationMinutes: positiveNumber.default(50),
    featuredReason: z.string().optional(),
  }),
};

export const UpdateSchema = {
  params: z.object({ courseId: id, academyId: id }),
  body: z.object({
    name: entityName.optional(),
    description: z.string().optional(),
    priceOriginal: price.optional(),
    priceDiscounted: price.optional(),
    totalSessions: positiveNumber.optional(),
    practicalSessions: positiveNumber.optional(),
    sessionDurationMinutes: positiveNumber.optional(),
    featuredReason: z.string().optional(),
    isActive: boolean.optional(),
  }),
};

export const DeleteSchema = {
  params: z.object({ courseId: id, academyId: id }),
};

export const GetAllSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    search: z.string().optional(),
    isActive: booleanQuery.optional(),
  }),
};

export const GetDetailsSchema = {
  params: z.object({ courseId: id, academyId: id }),
};

export const GetActiveSchema = {
  params: z.object({ academyId: id }),
};

export const AddCourseFeaturesSchema = {
  params: z.object({ academyId: id, courseId: id }),
  body: z.object({
    text: z.string(),
  }),
};

export const DeleteCourseFeaturesSchema = {
  params: z.object({ academyId: id, courseId: id, featureId: id }),
};
