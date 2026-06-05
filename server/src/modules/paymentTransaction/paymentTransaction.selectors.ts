import { PaymentTransactionSelect } from "../../../prisma/generated/models";

export const paymentTransactionBaseSelect: PaymentTransactionSelect = {
  id: true,
  amount: true,
  status: true,
  paymentMethod: true,
  type: true,
  createdAt: true,
  proofOfPaymentImage: true,
  receiver: { select: { id: true, name: true, phone: true } },
  academy: { select: { id: true, name: true } },
  subscription: { select: { id: true } },
  client: { select: { id: true, name: true, phone: true } },
};