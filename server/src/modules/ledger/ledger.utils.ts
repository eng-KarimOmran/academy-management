import { LedgerCategory, LedgerEffect } from "../../../prisma/generated/enums";
import { LedgerTransactionWhereInput } from "../../../prisma/generated/models";

export const buildLedgerTransactionWhere = ({
  search,
  academyId,
  category,
  ledgerEffect,
}: {
  academyId: string;
  search?: string;
  category?: LedgerCategory;
  ledgerEffect?: LedgerEffect;
}): LedgerTransactionWhereInput => {
  const where: LedgerTransactionWhereInput = { academyId };

  if (search) {
    where.OR = [
      {
        notes: { contains: search, mode: "insensitive" },
        user: {
          name: { contains: search, mode: "insensitive" },
          phone: { contains: search, mode: "insensitive" },
        },
      },
    ];
  }

  if (category) {
    where.category = category;
  }

  if (ledgerEffect) {
    where.ledgerEffect = ledgerEffect;
  }

  return where;
};