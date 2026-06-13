import type { PaymentMethod, Status, TransactionType } from "./enums";

export interface Payment {
  id: string;
  amount: number;
  status: Status;
  paymentMethod: PaymentMethod;
  type: TransactionType;
  proofOfPaymentImage: {
    id: string,
    imageUrl: string,
    publicId: string,
    transactionId: string
  };
  createdAt: string;
  receiver: { id: string; name: string; phone: string };
  academy: { id: string; name: string };
  subscription: { id: string };
  client: { id: string; name: string; phone: string };
}