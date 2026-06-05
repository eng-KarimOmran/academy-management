import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  phone,
  price,
} from "../../shared/utils/common.validation";

export const CreateSecretarySchema = {
  body: z.object({
    phone: phone,
    baseSalary: price,
    targetCount: price,
    bonusAmount: price,
  }),
};

export const UpdateSecretarySchema = {
  params: z.object({ secretaryId: id }),
  body: z.object({
    baseSalary: price.optional(),
    targetCount: price.optional(),
    bonusAmount: price.optional(),
  }),
};

export const GetAllSecretariesSchema = {
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    search: z.string().optional(),
  }),
};

export const GetSecretaryDetailsSchema = {
  params: z.object({ secretaryId: id }),
};

export const DeleteSecretarySchema = {
  params: z.object({ secretaryId: id }),
};
