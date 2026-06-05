import z from "zod";
import {
  id,
  limit,
  phone,
  positiveNumber,
  price,
} from "@/validations/common.validation";

export const CreateSecretarySchema = z.object({
  phone,
  baseSalary: price,
  targetCount: price,
  bonusAmount: price,
});

export const UpdateSecretarySchema = z.object({
  secretaryId: id,
  baseSalary: price,
  targetCount: price,
  bonusAmount: price,
});

export const DeleteSecretarySchema = z.object({
  secretaryId: id,
});

export const GetSecretarySchema = z.object({
  secretaryId: id,
});

export const GetAllSecretariesSchema = z.object({
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
  search: z.string().optional().default(""),
});
