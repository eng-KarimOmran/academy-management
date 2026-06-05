import {
  PaymentTransactionCreateInput,
  PaymentTransactionOrderByWithRelationInput,
  PaymentTransactionSelect,
  PaymentTransactionUpdateInput,
  PaymentTransactionWhereInput,
} from "../../../prisma/generated/models";

import { prisma } from "../../lib/prisma";
import { recalculateSubscriptionStatus } from "../subscription/subscription.repository";
import { paymentTransactionBaseSelect } from "./paymentTransaction.selectors";

export const findPaymentTransactionById = async ({
  id,
  select = paymentTransactionBaseSelect,
}: {
  id: string;
  select?: PaymentTransactionSelect;
}) => {
  return await prisma.paymentTransaction.findUnique({
    where: { id },
    select,
  });
};

export const findManyPaymentTransactions = async (data: {
  where?: PaymentTransactionWhereInput;
  skip?: number;
  take?: number;
  orderBy?: PaymentTransactionOrderByWithRelationInput;
}) => {
  const [transactions, count] = await prisma.$transaction([
    prisma.paymentTransaction.findMany({
      ...data,
      select: paymentTransactionBaseSelect,
    }),
    prisma.paymentTransaction.count({
      where: data.where,
    }),
  ]);

  return { transactions, count };
};

export const createPaymentTransaction = async (
  data: PaymentTransactionCreateInput,
) => {
  return await prisma.$transaction(async (tx) => {
    const payment = await tx.paymentTransaction.create({
      data,
      select: paymentTransactionBaseSelect,
    });
    const isCustomerPayment = payment.type === "PAYMENT";

    if (payment.paymentMethod === "CASH") {
      await tx.ledgerTransaction.create({
        data: {
          amount: payment.amount,
          academyId: payment.academy.id,
          userId: payment.receiver.id,
          referenceId: payment.id,
          category: isCustomerPayment ? "FROM_CUSTOMER" : "TO_CUSTOMER",
          ledgerEffect: isCustomerPayment ? "DEBIT" : "CREDIT",
          notes: isCustomerPayment ? "العميل دفع فلوس" : "تم رد فلوس للعميل",
        },
      });
    }

    await recalculateSubscriptionStatus({ id: payment.subscription.id, tx });

    return payment;
  });
};

export const updatePaymentTransaction = async ({
  id,
  data,
}: {
  id: string;
  data: PaymentTransactionUpdateInput;
}) => {
  return await prisma.$transaction(async (tx) => {
    const payment = await tx.paymentTransaction.update({
      where: { id },
      data,
      select: paymentTransactionBaseSelect,
    });
    await recalculateSubscriptionStatus({ id: payment.subscription.id, tx });
    return payment;
  });
};
