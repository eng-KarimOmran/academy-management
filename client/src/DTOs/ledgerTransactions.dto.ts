import z from "zod";
import * as Schema from "../validations/ledgers.validation";

export type CreateLedgerTransactionDto = {
  params: z.infer<typeof Schema.CreateLedgerTransactionSchema.params>;
  body: z.infer<typeof Schema.CreateLedgerTransactionSchema.body>;
};

export type GetAllLedgerTransactionsDto = {
  params: z.infer<typeof Schema.GetAllLedgerTransactionsSchema.params>;
  query: z.infer<typeof Schema.GetAllLedgerTransactionsSchema.query>;
};

export type GetLedgerTransactionDetailsDto = {
  params: z.infer<typeof Schema.GetLedgerTransactionDetailsSchema.params>;
};

export type DeleteLedgerTransactionDto = {
  params: z.infer<typeof Schema.DeleteLedgerTransactionSchema.params>;
};