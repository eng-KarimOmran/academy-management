import z from "zod";
import { LedgerTransactionSchema } from "./ledgerTransaction.schema";

export type CreateLedgerTransactionDto = {
  params: z.infer<typeof LedgerTransactionSchema.create.params>;
  body: z.infer<typeof LedgerTransactionSchema.create.body>;
};

export type UpdateLedgerTransactionDto = {
  params: z.infer<typeof LedgerTransactionSchema.update.params>;
  body: z.infer<typeof LedgerTransactionSchema.update.body>;
};

export type DeleteLedgerTransactionDto = {
  params: z.infer<typeof LedgerTransactionSchema.delete.params>;
};

export type GetLedgerTransactionDto = {
  params: z.infer<typeof LedgerTransactionSchema.get.params>;
};

export type GetAllLedgerTransactionsDto = {
  params: z.infer<typeof LedgerTransactionSchema.getAll.params>;
  query: z.infer<typeof LedgerTransactionSchema.getAll.query>;
};