import z from "zod";
import * as Schema from "./ledgerTransaction.schema";

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

export type ChangeLedgerTransactionStatusDto = {
  params: z.infer<typeof Schema.ChangeLedgerTransactionStatusSchema.params>;
  body: z.infer<typeof Schema.ChangeLedgerTransactionStatusSchema.body>;
};