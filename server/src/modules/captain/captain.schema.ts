import z from "zod";

import {
  id,
  limit,
  positiveNumber,
  trainingSupport,
  boolean,
  phone,
  price,
  booleanQuery,
  date,
} from "../../shared/utils/common.validation";

export const CreateCaptainSchema = {
  body: z.object({
    phone: phone,
    captainLessonPrice: price,
    trainingType: trainingSupport.default("BOTH"),
  }),
};

export const UpdateCaptainSchema = {
  params: z.object({ captainId: id }),
  body: z.object({
    captainLessonPrice: price.optional(),
    trainingType: trainingSupport.optional(),
    isActive: boolean.optional(),
  }),
};

export const GetAllCaptainsSchema = {
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    search: z.string().optional(),
    isActive: booleanQuery.optional(),
    trainingType: trainingSupport.optional(),
  }),
};

export const GetCaptainDetailsSchema = {
  params: z.object({ captainId: id }),
};

export const DeleteCaptainSchema = {
  params: z.object({ captainId: id }),
};

export const GetLessonCaptainSchema = {
  params: z.object({ userId: id }),
  query: z.object({ gte: date.optional(), lte: date.optional() }),
};