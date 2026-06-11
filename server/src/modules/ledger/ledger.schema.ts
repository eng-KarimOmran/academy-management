import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  ledgerCategory,
  ledgerEffect,
  date,
} from "../../shared/utils/common.validation";

export const CreateLedgerTransactionSchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    userId: id,
    amount: positiveNumber,
    category: ledgerCategory,
    notes: z.string().optional(),
  }),
};

export const UpdateLedgerTransactionSchema = {
  params: z.object({ academyId: id, ledgerId: id }),
  body: z.object({
    amount: positiveNumber.optional(),
    category: ledgerCategory.optional(),
    notes: z.string().optional(),
  }),
};

export const DeleteLedgerSchema = {
  params: z.object({ academyId: id, ledgerId: id }),
};

export const GetLedgerTransactionsSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    category: ledgerCategory.optional(),
    ledgerEffect: ledgerEffect.optional(),
    search: z.string().optional(),
  }),
};

export const GetLedgerDetailsSchema = {
  params: z.object({ academyId: id, ledgerId: id }),
};

export const getUserAccountsSchema = {
  params: z.object({ userId: id, academyId: id }),
  query: z.object({
    from: date.optional(),
    to: date.optional(),
  }),
};