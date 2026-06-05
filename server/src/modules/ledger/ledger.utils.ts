import { LedgerCategory, LedgerEffect } from "../../../prisma/generated/enums";
import { LedgerTransactionWhereInput } from "../../../prisma/generated/models";
import dayjs from "dayjs";

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

export const getCycle = () => {
  const today = dayjs();

  const current28 = today.date(28);

  const from = today.date() >= 28
    ? current28
    : current28.subtract(1, "month");

  const to = from.add(1, "month");

  return {
    from: from.startOf("day").toDate(),
    to: to.startOf("day").toDate(),
  };
};