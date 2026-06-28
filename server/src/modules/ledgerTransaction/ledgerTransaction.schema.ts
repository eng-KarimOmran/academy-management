import * as z from "zod";
import { TransactionType } from "../../../prisma/generated/enums";
import {
  id,
  price,
  paymentMethod,
  transactionType,
  url,
  page,
  limit,
} from "../../shared/utils/common.validation";

export const CreateLedgerTransactionSchema = {
  params: z.object({
    academyId: id,
  }),

  body: z
    .object({
      senderId: id,
      receiverId: id,
      transactionType,
      paymentMethod,
      amount: price.min(1, "يجب أن يكون مبلغ الدفع أكبر من صفر"),
      subscriptionId: id.optional(),

      image: z
        .object({
          publicId: z.string().min(1, "معرف الصورة مطلوب"),
          imageUrl: url,
        })
        .optional(),
    })
    .refine((data) => data.senderId !== data.receiverId, {
      error: "لا يمكن أن يكون المرسل والمستقبل نفس الحساب",
      path: ["receiverId"],
    })
    .refine(
      (data) => {
        const isCustomerTx =
          data.transactionType === TransactionType.CUSTOMER_PAYMENT ||
          data.transactionType === TransactionType.CUSTOMER_REFUND;

        return !isCustomerTx || !!data.subscriptionId;
      },
      {
        error: "رقم الاشتراك مطلوب عند عمليات دفع أو استرداد العميل",
        path: ["subscriptionId"],
      },
    )
    .refine(
      (data) => {
        const isElectronic = data.paymentMethod === "ELECTRONIC";
        return !isElectronic || !!data.image;
      },
      {
        error: "الصورة مطلوبة عند الدفع الإلكتروني",
        path: ["image"],
      },
    ),
};

export const GetAllLedgerTransactionsSchema = {
  params: z.object({
    academyId: id,
  }),

  query: z.object({
    page,

    limit,

    search: z.string().optional(),

    transactionType: transactionType.optional(),

    paymentMethod: paymentMethod.optional(),
  }),
};

export const GetLedgerTransactionDetailsSchema = {
  params: z.object({
    academyId: id,
    ledgerTransactionId: id,
  }),
};