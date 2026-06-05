import { PaymentTransaction } from "../../../prisma/generated/client";
import {
  PaymentMethod,
  Status,
  TransactionType,
} from "../../../prisma/generated/enums";
import { PaymentTransactionWhereInput } from "../../../prisma/generated/models";

export const buildPaymentTransactionWhere = ({
  search,
  paymentMethod,
  status,
  type,
  academyId,
}: {
  search?: string;
  type?: TransactionType;
  paymentMethod?: PaymentMethod;
  status?: Status;
  academyId: string;
}): PaymentTransactionWhereInput => {
  const where: PaymentTransactionWhereInput = { academyId };

  if (search) {
    where.OR = [
      { client: { name: { contains: search, mode: "insensitive" } } },
      { client: { phone: { contains: search, mode: "insensitive" } } },
    ];
  }

  if (paymentMethod) {
    where.paymentMethod = paymentMethod;
  }

  if (status) {
    where.status = status;
  }

  if (type) {
    where.type = type;
  }

  return where;
};

export const calculateFinancial = (
  paymentTransactions: PaymentTransaction[],
  totalDue: number,
) => {
  const { totalPaid, totalRefunded } = paymentTransactions.reduce(
    (acc, p) => {
      if (p.status === "COMPLETED") {
        if (p.type === "PAYMENT") {
          acc.totalPaid += p.amount;
        } else if (p.type === "REFUND") {
          acc.totalRefunded += p.amount;
        }
      }
      return acc;
    },
    { totalPaid: 0, totalRefunded: 0 },
  );

  const netPaid = totalPaid - totalRefunded;
  const remaining = totalDue - netPaid;

  return { remaining, netPaid };
};
