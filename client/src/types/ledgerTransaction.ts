import type { PaymentMethod, TransactionParty, TransactionType } from "./enums";

interface AcademyMini {
    id: string,
    name: string
}

export interface ProofOfPaymentImage {
    id: string,
    imageUrl: string
}

export interface LedgerTransaction {
    id: string;
    amount: number;
    paymentMethod: PaymentMethod;
    senderType: TransactionParty;
    receiverType: TransactionParty;
    transactionType: TransactionType;
    receiverId: string;
    senderId: string;
    createdAt: string;
    proofOfPaymentImage: ProofOfPaymentImage | null;
    academy: AcademyMini;
}