import { PaymentTransactionSelect } from "../../../prisma/generated/models";

export const paymentTransactionBaseSelect: PaymentTransactionSelect = {
  id: true,
  amount: true,
  status: true,
  paymentMethod: true,
  type: true,
  createdAt: true,
  proofOfPaymentImage: true,
  subscriptionId: true,
  receiver: { select: { id: true, name: true, phone: true } },
  academy: { select: { id: true, name: true } },
  client: { select: { id: true, name: true, phone: true } },
};