import z from "zod";
import {
  CreateLedgerTransactionSchema,
  GetLedgerTransactionsSchema,
  GetLedgerDetailsSchema,
  DeleteLedgerSchema,
  getUserAccountsSchema,
} from "./ledger.schema";

// ==========================================
// Create Ledger Transaction DTO
// ==========================================

export type CreateLedgerTransactionDto = {
  params: z.infer<typeof CreateLedgerTransactionSchema.params>;
  body: z.infer<typeof CreateLedgerTransactionSchema.body>;
};

// ==========================================
// Get Ledger Transactions DTO
// ==========================================

export type GetLedgerTransactionsDto = {
  params: z.infer<typeof GetLedgerTransactionsSchema.params>;
  query: z.infer<typeof GetLedgerTransactionsSchema.query>;
};

// ==========================================
// Get Ledger Details DTO
// ==========================================

export type GetLedgerDetailsDto = {
  params: z.infer<typeof GetLedgerDetailsSchema.params>;
};

// ==========================================
// Delete Ledger DTO
// ==========================================

export type DeleteLedgerDto = {
  params: z.infer<typeof DeleteLedgerSchema.params>;
};

export type getUserAccountsDto = {
  params: z.infer<typeof getUserAccountsSchema.params>;
  query: z.infer<typeof getUserAccountsSchema.query>;
};