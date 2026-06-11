import { PrismaClient, LedgerCategory, LedgerEffect } from "../../../prisma/generated/client";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  LedgerTransactionCreateInput,
  LedgerTransactionWhereInput,
  LedgerTransactionOrderByWithRelationInput,
  LedgerTransactionSelect,
  LedgerTransactionUpdateInput,
} from "../../../prisma/generated/models";
import getClient from "../../shared/utils/getClient";
import { ledgerBaseSelect } from "./ledger.selectors";

const LedgerRepository = {
  async create({ data, select, tx }: { data: LedgerTransactionCreateInput; select?: LedgerTransactionSelect; tx?: TransactionClient }) {
    const indebtedness: LedgerCategory[] = ["TO_CUSTOMER", "TO_USER", "BONUS", "TO_ACADEMY"];

    const effect: LedgerEffect = indebtedness.includes(data.category as LedgerCategory) ? "CREDIT" : "DEBIT";

    data.ledgerEffect = effect;

    return await getClient(tx).ledgerTransaction.create({ 
      data,
      select: select ?? ledgerBaseSelect,
    });
  },

  async update({ id, data, select, tx }: { id: string; data: LedgerTransactionUpdateInput; select?: LedgerTransactionSelect; tx?: TransactionClient }) {
    if (data.category) {
      const indebtedness: LedgerCategory[] = ["TO_CUSTOMER", "TO_USER", "BONUS", "TO_ACADEMY"];
      const effect: LedgerEffect = indebtedness.includes(data.category as LedgerCategory) ? "CREDIT" : "DEBIT";
      data.ledgerEffect = effect;
    }

    return await getClient(tx).ledgerTransaction.update({
      where: { id },
      data,
      select: select ?? ledgerBaseSelect,
    });
  },

  async delete({ id, select, tx }: { id: string; select?: LedgerTransactionSelect; tx?: TransactionClient }) {
    return await getClient(tx).ledgerTransaction.delete({
      where: { id },
      select: select ?? ledgerBaseSelect,
    });
  },

  async findById({ id, select, tx }: { id: string; select?: LedgerTransactionSelect; tx?: TransactionClient }) {
    return getClient(tx).ledgerTransaction.findUnique({
      where: { id },
      select: select ?? ledgerBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: LedgerTransactionWhereInput; orderBy?: LedgerTransactionOrderByWithRelationInput; select?: LedgerTransactionSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [transactions, count] = await Promise.all([
      client.ledgerTransaction.findMany({ 
        where, 
        skip, 
        take, 
        orderBy, 
        select: select ?? ledgerBaseSelect 
      }),
      client.ledgerTransaction.count({ where }),
    ]);

    return { transactions, count };
  }
};

export default LedgerRepository;