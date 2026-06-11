import * as DTO from "./ledger.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { LedgerTransactionCreateInput, LedgerTransactionUpdateInput } from "../../../prisma/generated/models";
import { buildLedgerTransactionWhere } from "./ledger.utils";
import LedgerRepository from "./ledger.repository";
import { getCycle } from "../../shared/utils/getCycle";

const LedgerService = {
  async create(dataSafe: DTO.CreateLedgerTransactionDto) {
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

    return await LedgerRepository.create({ data });
  },


  async update(dataSafe: DTO.UpdateLedgerTransactionDto) {
    const { body, params } = dataSafe;

    const transactionExists = await LedgerRepository.findById({ id: params.ledgerId });
    if (!transactionExists) throw ApiError.NotFound({ model: "LedgerTransaction" });

    const updateData: LedgerTransactionUpdateInput = { ...body };

    return await LedgerRepository.update({ id: params.ledgerId, data: updateData });
  },


  async delete(data: DTO.DeleteLedgerDto) {
    const { params } = data
    const transactionExists = await LedgerRepository.findById({ id: params.ledgerId });
    if (!transactionExists) throw ApiError.NotFound({ model: "LedgerTransaction" });

    return await LedgerRepository.delete({ id: params.ledgerId });
  },

  async getAll(dataSafe: DTO.GetLedgerTransactionsDto) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { page, limit, category, ledgerEffect, search } = query;

    const where = buildLedgerTransactionWhere({
      academyId,
      category,
      ledgerEffect,
      search,
    });

    const { take, skip } = getPagination({ page, limit });

    const { transactions, count } = await LedgerRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    return { items: transactions, pagination };
  },


  async getDetails(dataSafe: DTO.GetLedgerDetailsDto) {
    const { ledgerId } = dataSafe.params;

    const ledger = await LedgerRepository.findById({ id: ledgerId });
    if (!ledger) throw ApiError.NotFound({ model: "LedgerTransaction" });

    return ledger;
  },


  async getUserAccounts(dataSafe: DTO.getUserAccountsDto) {
    const { query, params } = dataSafe;
    const { academyId, userId } = params;

    const cycle = getCycle();
    const from = query.from ?? cycle.from;
    const to = query.to ?? cycle.to;

    const { transactions } = await LedgerRepository.findMany({
      where: {
        academyId,
        userId,
        createdAt: { gte: from, lt: to },
      },
      take: 1000,
      orderBy: { createdAt: "desc" },
    });

    const summary = transactions.reduce(
      (acc, tx) => {
        const amount = Number(tx.amount);
        acc.categories[tx.category] = (acc.categories[tx.category] || 0) + amount;
        if (tx.category === "TO_USER" || tx.category === "BONUS") {
          acc.userBalance += amount;
        } else if (tx.category === "FROM_ACADEMY" || tx.category === "PENALTY") {
          acc.userBalance -= amount;
        }

        if (tx.category === "FROM_CUSTOMER") {
          acc.pendingHandover += amount;
        } else if (tx.category === "TO_CUSTOMER" || tx.category === "TO_ACADEMY") {
          acc.pendingHandover -= amount;
        }

        if (tx.category === "PENALTY") {
          acc.totalPenalties += amount;
        }

        return acc;
      },
      {
        userBalance: 0,
        pendingHandover: 0,
        totalPenalties: 0,
        categories: {} as Record<string, number>,
      },
    );

    return {
      from,
      to,
      userBalance: summary.userBalance,
      pendingHandover: summary.pendingHandover,
      totalPenalties: summary.totalPenalties,
      categories: summary.categories,
      transactions,
    };
  }
};

export default LedgerService;