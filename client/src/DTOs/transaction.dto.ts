import z from "zod";
import * as Schema from "../validations/transaction.validation";

export type CreatePaymentTransactionDto = z.infer<
  typeof Schema.CreatePaymentTransactionSchema
>;

export type GetAllPaymentTransactionsDto = z.infer<
  typeof Schema.GetAllPaymentTransactionsSchema
>;

export type GetPaymentTransactionDetailsDto = z.infer<
  typeof Schema.GetPaymentTransactionDetailsSchema
>;

export type ChangePaymentStatusDto = z.infer<
  typeof Schema.ChangePaymentStatusSchema
>;

export type DeletePaymentTransactionDto = z.infer<
  typeof Schema.DeletePaymentTransactionSchema
>;