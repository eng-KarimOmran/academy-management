import * as DTO from "./paymentTransaction.dto";
import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { buildPaymentTransactionWhere, calculateFinancial } from "./paymentTransaction.utils";
import PaymentTransactionRepository from "./paymentTransaction.repository";
import { PaymentTransactionCreateInput } from "../../../prisma/generated/models";
import SubscriptionRepository from "../subscription/subscription.repository";

const PaymentTransactionService = {
  async createPayment(userId: string, dataSafe: DTO.CreatePaymentTransactionDto) {
    const { body } = dataSafe;
    const { amount, paymentMethod, subscriptionId, type } = body;

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { payments: true },
    });

    if (!subscription) throw ApiError.NotFound({ model: "Subscription" });

    const { remaining } = calculateFinancial(subscription.payments, subscription.priceAtBooking);

    if (type === "PAYMENT" && amount > remaining) {
      throw ApiError.Conflict(
        "OVERPAYMENT",
        `لا يمكنك دفع مبلغ ${amount}، المبلغ المتبقي المستحق هو ${remaining} فقط.`
      );
    }

    const data: PaymentTransactionCreateInput = {
      amount,
      paymentMethod,
      type,
      status: paymentMethod === "CASH" ? "COMPLETED" : "PENDING",
      subscription: { connect: { id: subscriptionId } },
      receiver: { connect: { id: userId } },
      academy: { connect: { id: subscription.academyId } },
      client: { connect: { id: subscription.clientId } },
    };

    return await PaymentTransactionRepository.create({ data });
  },

  async getAllPaymentTransactions(dataSafe: DTO.GetAllPaymentTransactionsDto) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { limit, page, search, paymentMethod, status, type } = query;

    const where = buildPaymentTransactionWhere({ search, academyId, paymentMethod, status, type });
    const { take, skip } = getPagination({ page, limit });

    const { count, transactions } = await PaymentTransactionRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, total: count, totalPages };

    return { items: transactions, pagination };
  },

  async getPaymentTransactionDetails(dataSafe: DTO.GetPaymentTransactionDetailsDto) {
    const { paymentId } = dataSafe.params;

    const paymentTransaction = await PaymentTransactionRepository.findById({ id: paymentId });
    if (!paymentTransaction) throw ApiError.NotFound({ model: "PaymentTransaction" });

    return paymentTransaction;
  },

  async changePaymentStatus(dataSafe: DTO.ChangePaymentStatusDto) {
    const { body, params } = dataSafe;
    const { paymentId } = params;
    const { status } = body;

    const paymentTransaction = await PaymentTransactionRepository.findById({ id: paymentId });
    if (!paymentTransaction) throw ApiError.NotFound({ model: "PaymentTransaction" });

    if (paymentTransaction.status === status) return paymentTransaction;

    return await prisma.$transaction(async (tx) => {
      const updatedPayment = await PaymentTransactionRepository.update({
        id: paymentId,
        data: { status },
        tx,
      });
      await SubscriptionRepository.recalculateSubscriptionStatus({ id: paymentTransaction.subscriptionId });
      return updatedPayment;
    });
  }
};

export default PaymentTransactionService;