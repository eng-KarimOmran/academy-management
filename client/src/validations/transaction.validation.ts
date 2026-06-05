import z from "zod";

import {
  id,
  limit,
  positiveNumber,
  paymentMethod,
  transactionStatus,
} from "@/validations/common.validation";

export const CreatePaymentTransactionSchema = z.object({
  academyId: id,
  amount: positiveNumber,
  paymentMethod,
  subscriptionId: id,
  lessonId: id.optional(),
});

export const GetAllPaymentTransactionsSchema = z.object({
  academyId: id,
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
});

export const GetPaymentTransactionDetailsSchema = z.object({
  academyId: id,
  paymentId: id,
});

export const UpdatePaymentTransactionSchema = z.object({
  academyId: id,
  paymentId: id,
  amount: positiveNumber.optional(),
  paymentMethod: paymentMethod.optional(),
  status: transactionStatus.optional(),
});

export const DeletePaymentTransactionSchema = z.object({
  academyId: id,
  paymentId: id,
});
