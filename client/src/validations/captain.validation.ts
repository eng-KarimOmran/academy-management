import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  boolean,
  date,
  price,
  supportType,
  booleanQuery,
} from "@/lib/common.validation";

export const CreateCaptainSchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    userId: id,
    captainLessonPrice: price,
    supportType: supportType,
    baseSalary: price,
  }),
};

export const UpdateCaptainSchema = {
  params: z.object({ academyId: id, captainId: id }),
  body: z.object({
    captainLessonPrice: price.optional(),
    supportType: supportType.optional(),
    isActive: boolean.optional(),
  }),
};

export const GetAllCaptainsSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    search: z.string().optional(),
    isActive: booleanQuery.optional(),
    supportType: supportType.optional(),
  }),
};

export const GetCaptainDetailsSchema = {
  params: z.object({ captainId: id, academyId: id }),
};

export const DeleteCaptainSchema = {
  params: z.object({ captainId: id, academyId: id }),
};

export const GetLessonCaptainSchema = {
  params: z.object({ userId: id }),
  query: z.object({ gte: date.optional(), lte: date.optional() }),
};