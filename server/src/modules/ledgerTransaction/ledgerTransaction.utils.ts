import { LedgerTransaction } from "../../../prisma/generated/client";
import { TransactionParty, TransactionType, PaymentMethod, TransactionDirection } from "../../../prisma/generated/enums";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import { LedgerTransactionWhereInput } from "../../../prisma/generated/models";
import ApiError from "../../shared/utils/ApiError";
import SubscriptionRepository from "../subscription/subscription.repository";
import LedgerTransactionRepository from "./ledgerTransaction.repository";
import { GetTransferEntitiesParams } from "./ledgerTransaction.type";

export const buildLedgerTransactionWhere = ({
  search,
  academyId,
  senderType,
  receiverType,
  transactionType,
  paymentMethod,
}: {
  search?: string;
  academyId: string;
  senderType?: TransactionParty;
  receiverType?: TransactionParty;
  transactionType?: TransactionType;
  paymentMethod?: PaymentMethod;
}): LedgerTransactionWhereInput => {
  const where: LedgerTransactionWhereInput = { academyId };

  if (senderType) {
    where.senderType = senderType;
  }

  if (receiverType) {
    where.receiverType = receiverType;
  }

  if (transactionType) {
    where.transactionType = transactionType;
  }

  if (paymentMethod) {
    where.paymentMethod = paymentMethod;
  }

  if (search) {
    where.OR = [
      { id: { startsWith: search, mode: "insensitive" } },
      { senderId: { startsWith: search, mode: "insensitive" } },
      { receiverId: { startsWith: search, mode: "insensitive" } },
    ];
  }

  return where;
};

export const getLedgerTransactionOrThrow = async (transactionId: string, tx: TransactionClient) => {
  const transactionEx = await LedgerTransactionRepository.findById(transactionId, tx);

  if (!transactionEx) throw ApiError.NotFound("LedgerTransaction");

  return transactionEx;
};


export const getTransferEntities = async ({
  senderId,
  receiverId,
  subscriptionId,
  tx,
}: GetTransferEntitiesParams) => {
  const [sender, receiver, subscription] = await Promise.all([
    tx.person.findUnique({ where: { id: senderId } }),
    tx.person.findUnique({ where: { id: receiverId } }),
    subscriptionId ? SubscriptionRepository.findById(subscriptionId) : undefined
  ])

  if (!sender || !receiver) {
    throw ApiError.NotFound("Person")
  }

  if (subscriptionId && !subscription) {
    throw ApiError.NotFound("Subscription")
  }

  return {
    sender,
    receiver,
    subscription,
  }
}

import { groupBy } from "remeda";



export function calculateLedgerSummary(
  ledger: LedgerTransaction[],
  priceAtBooking: number
) {
  const grouped = groupBy(ledger, (l) => l.transactionDirection);

  const IN = grouped.IN ?? [];
  const OUT = grouped.OUT ?? [];

  const totalIN = IN.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalOUT = OUT.reduce((sum, t) => sum + Number(t.amount), 0);
  const netBalance = totalIN - totalOUT;
  const residual = priceAtBooking - netBalance

  return {
    residual,
    totalIN,
    netBalance,
    totalOUT,
  };
}

export const transactionConfig: Record<
  TransactionType,
  {
    receiverType: TransactionParty;
    senderType: TransactionParty;
    transactionDirection: TransactionDirection;
  }
> = {
  CUSTOMER_PAYMENT: {
    receiverType: "EMPLOYEE",
    senderType: "CLIENT",
    transactionDirection: "IN",
  },

  CUSTOMER_REFUND: {
    receiverType: "CLIENT",
    senderType: "EMPLOYEE",
    transactionDirection: "OUT",
  },

  EMPLOYEE_TRANSFER_TO_EMPLOYEE: {
    receiverType: "EMPLOYEE",
    senderType: "EMPLOYEE",
    transactionDirection: "OUT",
  },

  EMPLOYEE_TRANSFER_TO_OWNER: {
    receiverType: "EMPLOYEE",
    senderType: "ACADEMY",
    transactionDirection: "IN",
  },
};