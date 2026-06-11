import z from "zod";
import {
  CreateLedgerTransactionSchema,
  UpdateLedgerTransactionSchema,
  GetLedgerTransactionsSchema,
  GetLedgerDetailsSchema,
  DeleteLedgerSchema,
  getUserAccountsSchema,
} from "./ledger.schema";

export type CreateLedgerTransactionDto = {
  params: z.infer<typeof CreateLedgerTransactionSchema.params>;
  body: z.infer<typeof CreateLedgerTransactionSchema.body>;
};

export type UpdateLedgerTransactionDto = {
  params: z.infer<typeof UpdateLedgerTransactionSchema.params>;
  body: z.infer<typeof UpdateLedgerTransactionSchema.body>;
};

export type GetLedgerTransactionsDto = {
  params: z.infer<typeof GetLedgerTransactionsSchema.params>;
  query: z.infer<typeof GetLedgerTransactionsSchema.query>;
};

export type GetLedgerDetailsDto = {
  params: z.infer<typeof GetLedgerDetailsSchema.params>;
};

export type DeleteLedgerDto = {
  params: z.infer<typeof DeleteLedgerSchema.params>;
};

export type getUserAccountsDto = {
  params: z.infer<typeof getUserAccountsSchema.params>;
  query: z.infer<typeof getUserAccountsSchema.query>;
};