import type { SubscriptionDetails } from "@/types/subscription";

export interface CalculatePaymentSummary {
  totalPaid: number;
  totalRefunded: number;
  netPaid: number;
  remaining: number;
  isFullyPaid: boolean;
}

export const calculatePaymentSummary = ({
  payments = [],
  totalRequiredAmount,
}: {
  payments?: SubscriptionDetails["ledgerTransactions"];
  totalRequiredAmount: number;
}): CalculatePaymentSummary => {


  let totalPaid = 0;
  let totalRefunded = 0;

  payments.forEach((p) => {
    if (p.receiverType === "SUBSCRIPTION") {
      totalRefunded += p.amount
    }

    if (p.senderType === "SUBSCRIPTION") {
      totalPaid += p.amount
    }
  })

  const netPaid = totalPaid - totalRefunded
  const remaining = totalRequiredAmount - netPaid
  const isFullyPaid = remaining <= 0

  return {
    totalPaid,
    totalRefunded,
    netPaid,
    remaining,
    isFullyPaid,
  };
};
