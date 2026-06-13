import type { SubscriptionDetails } from "@/types/subscription";

export interface CalculatePaymentSummary {
  totalPaid: number; // إجمالي المدفوع
  totalRefunded: number; // إجمالي المرتجع/الراجع
  netPaid: number; // الصافي الفعلي
  remaining: number; // المتبقي
  isFullyPaid: boolean;
}

export const calculatePaymentSummary = ({
  payments = [],
  totalRequiredAmount,
}: {
  payments?: SubscriptionDetails["payments"];
  totalRequiredAmount: number;
}): CalculatePaymentSummary => {
  const summary = payments.reduce(
    (acc, p) => {
      if (p.status === "COMPLETED") {
        if (p.type === "REFUND") {
          acc.refunded += p.amount;
        } else {
          acc.paid += p.amount;
        }
      }

      return acc;
    },
    { paid: 0, refunded: 0 },
  );

  const netPaid = summary.paid - summary.refunded;
  const remainingRaw = totalRequiredAmount - netPaid;

  return {
    totalPaid: summary.paid,
    totalRefunded: summary.refunded,
    netPaid,
    remaining: Math.max(remainingRaw, 0),
    isFullyPaid: remainingRaw <= 0,
  };
};
