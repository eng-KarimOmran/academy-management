import { buildLedgerTransactionWhere, getCycle } from "./ledger.utils";
import * as DTO from "./ledger.dto";

import ApiError from "../../shared/utils/ApiError";
import { getPaginationParams } from "../../shared/utils/Pagination";

import {
  create as createLedger,
  findMany as findManyLedger,
  findById as findLedgerById,
} from "./ledger.repository";

import { LedgerTransactionCreateInput } from "../../../prisma/generated/models";

export const create = async (dataSafe: DTO.CreateLedgerTransactionDto) => {
  const { body, params } = dataSafe;
  const { academyId } = params;
  const { amount, category, userId, notes } = body;

  const data: LedgerTransactionCreateInput = {
    academy: { connect: { id: academyId } },
    user: { connect: { id: userId } },
    amount,
    category,
    notes,
  };

  return await createLedger(data);
};

export const getAll = async (dataSafe: DTO.GetLedgerTransactionsDto) => {
  const { query, params } = dataSafe;
  const { academyId } = params;

  const { page, limit, category, ledgerEffect } = query;

  const where = buildLedgerTransactionWhere({
    academyId,
    category,
    ledgerEffect,
  });

  const { transactions, count } = await findManyLedger({
    where,
    skip: Math.max(0, page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({
    page,
    limit,
    count,
  });

  return {
    items: transactions,
    pagination: {
      page: safePage,
      limit,
      total: count,
      totalPages,
    },
  };
};

export const getDetails = async (dataSafe: DTO.GetLedgerDetailsDto) => {
  const { ledgerId, academyId } = dataSafe.params;

  const ledger = await findLedgerById(ledgerId);

  if (!ledger) throw ApiError.NotFound({ model: "LedgerTransaction" });

  return ledger;
};

export const getUserAccounts = async (dataSafe: DTO.getUserAccountsDto) => {
  const { query, params } = dataSafe;
  const { academyId, userId } = params;

  const cycle = getCycle();

  const from = query.from ?? cycle.from;
  const to = query.to ?? cycle.to;

  const { transactions } = await findManyLedger({
    where: {
      academyId,
      userId,
      createdAt: {
        gte: from,
        lt: to,
      },
    },
    skip: 0,
    take: 1000,
    orderBy: { createdAt: "desc" },
  });

  const summary = transactions.reduce(
    (acc, tx) => {
      const amount = Number(tx.amount);
      acc.categories[tx.category] = (acc.categories[tx.category] || 0) + amount;
      if (tx.ledgerEffect === "CREDIT") {
        acc.balance -= amount;
        acc.totalCredit += amount;
      } else {
        acc.balance += amount;
        acc.totalDebit += amount;
      }
      return acc;
    },
    {
      balance: 0,
      totalCredit: 0,
      totalDebit: 0,
      categories: {} as Record<string, number>,
    },
  );

  return {
    from,
    to,
    balance: summary.balance,
    totalCredit: summary.totalCredit,
    totalDebit: summary.totalDebit,
    categories: summary.categories,
    transactions,
  };
};