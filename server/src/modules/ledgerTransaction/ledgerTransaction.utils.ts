import { LedgerTransactionOrderByWithRelationInput } from './../../../prisma/generated/models/LedgerTransaction';
import { LedgerTransaction } from "../../../prisma/generated/client";
import {
  PaymentMethod,
  TransactionType,
} from "../../../prisma/generated/enums";
import { LedgerTransactionWhereInput } from "../../../prisma/generated/models";

export const buildLedgerTransactionWhere = ({
  academyId,
  search,
  paymentMethod,
  transactionType,
}: {
  academyId: string;
  search?: string;
  paymentMethod?: PaymentMethod;
  transactionType?: TransactionType;
}): LedgerTransactionWhereInput => {
  const where: LedgerTransactionWhereInput = {
    academyId,
  };

  if (transactionType) {
    where.transactionType = transactionType;
  }

  if (paymentMethod) {
    where.paymentMethod = paymentMethod;
  }

  if (search) {
    where.OR = [
      {
        subscription: { id: { contains: search } },
      },
    ];
  }

  return where;
};

export const orderBy: LedgerTransactionOrderByWithRelationInput = {
  createdAt: "desc",
}