import z from "zod";

import {
  id,
  limit,
  positiveNumber,
  paymentMethod,
  transactionStatus,
  transactionType,
} from "@/validations/common.validation";

export const CreatePaymentTransactionSchema = z.object({
  academyId: id,
  amount: positiveNumber,
  paymentMethod,
  subscriptionId: id,
  type: transactionType,
  proofImage: z.any().optional()
});

export const GetAllPaymentTransactionsSchema = z.object({
  academyId: id,
  limit: limit,
  page: positiveNumber.optional().default(1),
  search: z.string().optional(),
  paymentMethod: paymentMethod.optional(),
  status: transactionStatus.optional(),
  type: transactionType.optional(),
});

export const GetPaymentTransactionDetailsSchema = z.object({
  academyId: id,
  transactionId: id,
});

export const ChangePaymentStatusSchema = z.object({
  academyId: id,
  paymentId: id,
  status: transactionStatus,
});

export const DeletePaymentTransactionSchema = z.object({
  academyId: id,
  paymentId: id,
});
