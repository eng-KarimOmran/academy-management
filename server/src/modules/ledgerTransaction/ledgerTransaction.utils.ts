import { LedgerTransaction } from "../../../prisma/generated/client";

export const calculateAccountBalance = (
  { financialAccountId,
    ledgerTransactions
  }: {
    financialAccountId?: string,
    ledgerTransactions: LedgerTransaction[]
  }) => {
  let IN = 0;
  let OUT = 0;

  if (financialAccountId) return 0

  for (const transaction of ledgerTransactions) {
    if (transaction.receiverId === financialAccountId) {
      IN += Number(transaction.amount);
    }

    if (transaction.senderId === financialAccountId) {
      OUT += Number(transaction.amount);
    }
  }

  return IN - OUT;
}