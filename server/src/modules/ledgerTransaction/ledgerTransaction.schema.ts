import z from "zod";
import { id, limit, paymentMethod, positiveNumber, price, transactionParty, transactionType, url } from "../../shared/utils/common.validation";

export const LedgerTransactionSchema = {
  create: {
    params: z.object({
      academyId: id,
    }),
    body: z.object({
      transactionType: transactionType,
      paymentMethod: paymentMethod,
      senderId: id,
      receiverId: id,
      amount: price,
      subscriptionId: id.optional(),
      proofOfPaymentImage: z.object({
        imageUrl: url,
        publicId: z.string()
      }).optional(),
    }),
  },

  update: {
    params: z.object({
      academyId: id,
      transactionId: id,
    }),
    body: z.object({
      transactionType: transactionType.optional(),
      paymentMethod: paymentMethod.optional(),
      senderId: id.optional(),
      receiverId: id.optional(),
      amount: price.optional(),
      subscriptionId: id.optional(),
      proofOfPaymentImage: z.object({
        imageUrl: url,
        publicId: z.string()
      }).optional(),
    }),
  },

  delete: {
    params: z.object({
      academyId: id,
      transactionId: id,
    }),
  },

  get: {
    params: z.object({
      academyId: id,
      transactionId: id,
    }),
  },

  getAll: {
    params: z.object({
      academyId: id,
    }),
    query: z.object({
      page: positiveNumber.optional().default(1),
      search: z.string().optional(),
      senderType: transactionParty.optional(),
      receiverType: transactionParty.optional(),
      transactionType: transactionType.optional(),
      paymentMethod: paymentMethod.optional(),
      limit,
    }),
  },
};