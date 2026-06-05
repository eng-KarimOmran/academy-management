import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  ledgerCategory,
  ledgerEffect,
  date,
} from "../../shared/utils/common.validation";

// ==========================================
// Create Ledger Transaction
// ==========================================

export const CreateLedgerTransactionSchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    userId: id,
    amount: positiveNumber,
    category: ledgerCategory,
    notes: z.string().optional(),
  }),
};

// ==========================================
// Get Ledger Transactions (pagination)
// ==========================================

export const GetLedgerTransactionsSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    category: ledgerCategory.optional(),
    ledgerEffect: ledgerEffect.optional(),
  }),
};

// ==========================================
// Get Ledger Details
// ==========================================

export const GetLedgerDetailsSchema = {
  params: z.object({ academyId: id, ledgerId: id }),
};

export const DeleteLedgerSchema = {
  params: z.object({ academyId: id, ledgerId: id }),
};

export const getUserAccountsSchema = {
  params: z.object({ userId: id, academyId: id }),
  query: z.object({
    from: date.optional(),
    to: date.optional(),
  }),
};
