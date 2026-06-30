import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  price,
} from "@/lib/common.validation";

export const CreateSecretarySchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    userId: id,
    baseSalary: price,
    targetCount: price,
    bonusAmount: price,
  }),
};

export const UpdateSecretarySchema = {
  params: z.object({ secretaryId: id, academyId: id }),
  body: z.object({
    baseSalary: price.optional(),
    targetCount: price.optional(),
    bonusAmount: price.optional(),
  }),
};

export const GetAllSecretariesSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    search: z.string().optional(),
  }),
};

export const GetSecretaryDetailsSchema = {
  params: z.object({ secretaryId: id, academyId: id }),
};

export const DeleteSecretarySchema = {
  params: z.object({ secretaryId: id, academyId: id }),
};
