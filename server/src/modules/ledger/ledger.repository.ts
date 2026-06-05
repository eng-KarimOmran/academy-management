import { LedgerCategory, LedgerEffect } from "../../../prisma/generated/enums";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  LedgerTransactionCreateInput,
  LedgerTransactionWhereInput,
  LedgerTransactionOrderByWithRelationInput,
} from "../../../prisma/generated/models";

import { prisma } from "../../lib/prisma";

export const create = async (
  data: LedgerTransactionCreateInput,
  tx?: TransactionClient,
) => {
  const client = tx || prisma;

  const indebtedness: LedgerCategory[] = [
    "FROM_CUSTOMER",
    "FROM_USER",
    "PENALTY",
  ];

  const ledgerEffect: LedgerEffect = indebtedness.includes(data.category)
    ? "CREDIT"
    : "DEBIT";

  data.ledgerEffect = ledgerEffect;

  return await client.ledgerTransaction.create({ data });
};

export const findMany = async ({
  where,
  skip,
  take,
  orderBy,
}: {
  where: LedgerTransactionWhereInput;
  skip: number;
  take: number;
  orderBy?: LedgerTransactionOrderByWithRelationInput;
}) => {
  const client = prisma;

  const [transactions, count] = await client.$transaction([
    client.ledgerTransaction.findMany({
      where,
      skip,
      take,
      orderBy,
    }),
    client.ledgerTransaction.count({ where }),
  ]);

  return { transactions, count };
};

export const findById = async (id: string) => {
  return await prisma.ledgerTransaction.findUnique({
    where: { id },
  });
};