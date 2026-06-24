import z from "zod";
import {
    id,
    limit,
    paymentMethod,
    positiveNumber,
    price,
    transactionParty,
    transactionType,
} from "./common.validation";

export const CreateLedgerTransactionSchema = {
    params: z.object({ academyId: id }),
    body: z.object({
        amount: price,
        paymentMethod,
        senderType: transactionParty,
        receiverType: transactionParty,
        transactionType,
        senderId: id,
        receiverId: id,
        proofImage: z.any().optional()
    }),
};


export const GetAllLedgerTransactionsSchema = {
    params: z.object({ academyId: id }),
    query: z.object({
        limit: limit,
        page: positiveNumber.optional().default(1),
        search: z.string().optional(),
        paymentMethod: paymentMethod.optional(),
        transactionType: transactionType.optional(),
    }),
};

export const GetLedgerTransactionDetailsSchema = {
    params: z.object({ ledgerTransactionId: id, academyId: id }),
};

export const DeleteLedgerTransactionSchema = {
    params: z.object({ ledgerTransactionId: id, academyId: id }),
};