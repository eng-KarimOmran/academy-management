import type { Payment } from "@/types/transaction";

export interface CalculatePaymentSummary {
  totalPaid: number;
  remaining: number;
  isFullyPaid: boolean;
}

export const calculatePaymentSummary = ({
  payments,
  totalRequiredAmount,
}: {
  payments: Payment[];
  totalRequiredAmount: number;
}): CalculatePaymentSummary => {
  const totalPaid = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  const remaining = totalRequiredAmount - totalPaid;

  return {
    totalPaid,
    remaining: remaining > 0 ? remaining : 0,
    isFullyPaid: remaining <= 0,
  };
};
