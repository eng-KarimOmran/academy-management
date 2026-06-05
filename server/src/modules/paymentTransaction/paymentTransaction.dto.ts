import z from "zod";
import * as Schema from "./paymentTransaction.schema";

export type CreatePaymentTransactionDto = {
  params: z.infer<typeof Schema.CreatePaymentTransactionSchema.params>;
  body: z.infer<typeof Schema.CreatePaymentTransactionSchema.body>;
};

export type GetAllPaymentTransactionsDto = {
  params: z.infer<typeof Schema.GetAllPaymentTransactionsSchema.params>;
  query: z.infer<typeof Schema.GetAllPaymentTransactionsSchema.query>;
};

export type GetPaymentTransactionDetailsDto = {
  params: z.infer<typeof Schema.GetPaymentTransactionDetailsSchema.params>;
};

export type ChangePaymentStatusDto = {
  params: z.infer<typeof Schema.ChangePaymentStatusSchema.params>;
  body: z.infer<typeof Schema.ChangePaymentStatusSchema.body>;
};