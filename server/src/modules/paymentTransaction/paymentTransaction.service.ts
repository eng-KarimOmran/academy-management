import * as DTO from "./paymentTransaction.dto";
import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import { getPaginationParams } from "../../shared/utils/Pagination";

import {
  buildPaymentTransactionWhere,
  calculateFinancial,
} from "./paymentTransaction.utils";

import {
  createPaymentTransaction,
  findManyPaymentTransactions,
  findPaymentTransactionById,
  updatePaymentTransaction,
} from "./paymentTransaction.repository";

export const createPayment = async (
  userId: string,
  dataSafe: DTO.CreatePaymentTransactionDto,
) => {
  const { body } = dataSafe;
  const { amount, paymentMethod, subscriptionId, type } = body;

  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: { payments: true },
  });

  if (!subscription) throw ApiError.NotFound({ model: "Subscription" });

  const { remaining } = calculateFinancial(
    subscription.payments,
    subscription.priceAtBooking,
  );

  if (amount > remaining) {
    throw ApiError.Conflict(
      "OVERPAYMENT",
      `لا يمكنك دفع مبلغ ${amount}، المبلغ المتبقي المستحق هو ${remaining} فقط.`,
    );
  }

  return await createPaymentTransaction({
    amount,
    paymentMethod,
    type,
    status: paymentMethod === "CASH" ? "COMPLETED" : "PENDING",
    subscription: {
      connect: {
        id: subscriptionId,
      },
    },
    receiver: {
      connect: {
        id: userId,
      },
    },
    academy: {
      connect: {
        id: subscription.academyId,
      },
    },
    client: {
      connect: {
        id: subscription.clientId,
      },
    },
  });
};

export const getAllPaymentTransactions = async (
  dataSafe: DTO.GetAllPaymentTransactionsDto,
) => {
  const { query, params } = dataSafe;
  const { academyId } = params;
  const { limit, page, search, paymentMethod, status, type } = query;

  const where = buildPaymentTransactionWhere({
    search,
    academyId,
    paymentMethod,
    status,
    type,
  });

  const { count, transactions } = await findManyPaymentTransactions({
    where,
    take: limit,
    skip: Math.max(0, page - 1 * limit),
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({
    limit,
    page,
    count,
  });

  const pagination = { limit, page: safePage, total: count, totalPages };

  return { items: transactions, pagination };
};

export const getPaymentTransactionDetails = async (
  dataSafe: DTO.GetPaymentTransactionDetailsDto,
) => {
  const { paymentId } = dataSafe.params;

  const paymentTransaction = await findPaymentTransactionById({
    id: paymentId,
  });

  if (!paymentTransaction)
    throw ApiError.NotFound({ model: "PaymentTransaction" });

  return paymentTransaction;
};

export const changePaymentStatus = async (
  dataSafe: DTO.ChangePaymentStatusDto,
) => {
  const { body, params } = dataSafe;
  const { paymentId } = params;
  const { status } = body;

  const paymentTransaction = await findPaymentTransactionById({
    id: paymentId,
  });

  if (!paymentTransaction)
    throw ApiError.NotFound({ model: "PaymentTransaction" });

  return await updatePaymentTransaction({ id: paymentId, data: { status } });
};