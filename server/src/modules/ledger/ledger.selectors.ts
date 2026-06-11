import { LedgerTransactionSelect } from "../../../prisma/generated/models";

export const ledgerBaseSelect: LedgerTransactionSelect = {
    id: true,
    amount: true,
    notes: true,
    ledgerEffect: true,
    referenceCategory: true,
    referenceId: true,
    category: true,
    createdAt: true,
    academyId: true,
    user: { select: { id: true, name: true, phone: true } }
};