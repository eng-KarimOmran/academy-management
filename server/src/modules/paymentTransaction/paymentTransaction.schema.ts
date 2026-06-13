import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  paymentMethod,
  transactionStatus,
  price,
  transactionType,
} from "../../shared/utils/common.validation";

export const CreatePaymentTransactionSchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    amount: price,
    paymentMethod,
    subscriptionId: id,
    type: transactionType,
    proofImage: z.any().optional()
  }),
};

export const GetAllPaymentTransactionsSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    limit: limit,
    page: positiveNumber.optional().default(1),
    search: z.string().optional(),
    paymentMethod: paymentMethod.optional(),
    status: transactionStatus.optional(),
    type: transactionType.optional(),
  }),
};

export const GetPaymentTransactionDetailsSchema = {
  params: z.object({ paymentId: id, academyId: id }),
};

export const ChangePaymentStatusSchema = {
  params: z.object({ paymentId: id, academyId: id }),
  body: z.object({
    status: transactionStatus.optional(),
  }),
};

export const DeletePaymentTransactionSchema = {
  params: z.object({ paymentId: id, academyId: id }),
};
