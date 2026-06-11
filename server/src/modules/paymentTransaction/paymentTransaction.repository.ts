import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  PaymentTransactionCreateInput,
  PaymentTransactionOrderByWithRelationInput,
  PaymentTransactionSelect,
  PaymentTransactionUpdateInput,
  PaymentTransactionWhereInput,
} from "../../../prisma/generated/models";
import getClient from "../../shared/utils/getClient";
import { paymentTransactionBaseSelect } from "./paymentTransaction.selectors";
import LedgerRepository from "../ledger/ledger.repository";
import SubscriptionRepository from "../subscription/subscription.repository";

const PaymentTransactionRepository = {
  async findById({ id, select = paymentTransactionBaseSelect, tx }: { id: string; select?: PaymentTransactionSelect; tx?: TransactionClient }) {
    return await getClient(tx).paymentTransaction.findUnique({
      where: { id },
      select,
    });
  },

  async findMany({ where, skip, take, orderBy, select = paymentTransactionBaseSelect, tx }: { where?: PaymentTransactionWhereInput; skip?: number; take?: number; orderBy?: PaymentTransactionOrderByWithRelationInput; select?: PaymentTransactionSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [transactions, count] = await Promise.all([
      client.paymentTransaction.findMany({ where, skip, take, orderBy, select }),
      client.paymentTransaction.count({ where }),
    ]);

    return { transactions, count };
  },

  async create({ data, tx }: { data: PaymentTransactionCreateInput; tx?: TransactionClient }) {
    const client = getClient(tx);

    const payment = await client.paymentTransaction.create({
      data,
      select: paymentTransactionBaseSelect,
    });

    const isCustomerPayment = payment.type === "PAYMENT";

    if (payment.paymentMethod === "CASH") {
      await LedgerRepository.create({
        data: {
          amount: payment.amount,
          referenceId: payment.id,
          referenceCategory: "paymentId",
          category: isCustomerPayment ? "FROM_CUSTOMER" : "TO_CUSTOMER",
          notes: isCustomerPayment ? `تحصيل كاش - فاتورة رقم: ${payment.id}` : `رد مالي كاش - فاتورة رقم: ${payment.id}`,
          academy: { connect: { id: payment.academyId } },
          user: { connect: { id: payment.receiverId } },
        },
        tx: client,
      });
    }

    await SubscriptionRepository.recalculateSubscriptionStatus({ id: payment.subscriptionId });
    return payment;
  },

  async update({ id, data, tx }: { id: string; data: PaymentTransactionUpdateInput; tx?: TransactionClient }) {
    const client = getClient(tx);

    const payment = await client.paymentTransaction.update({
      where: { id },
      data,
      select: paymentTransactionBaseSelect,
    });

    await SubscriptionRepository.recalculateSubscriptionStatus({ id: payment.subscriptionId });
    return payment;
  }
};

export default PaymentTransactionRepository;