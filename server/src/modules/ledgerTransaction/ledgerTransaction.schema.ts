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
  ledgerTransactionStatus
} from "../../shared/utils/common.validation";

export const CreateLedgerTransactionSchema = {
  params: z.object({
    academyId: id,
  }),

  body: z
    .object({
      accountId: id.optional(),
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
        abort: true,
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
        abort: true,
      },
    )
    .refine(
      (data) => {
        const isEmployeeTransfer =
          data.transactionType ===
          TransactionType.EMPLOYEE_TRANSFER_TO_EMPLOYEE;
        return !isEmployeeTransfer || !!data.accountId;
      },
      {
        error: "معرف الموظف المستلم مطلوب",
        path: ["accountId"],
        abort: true,
      },
    )
}

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

export const ChangeLedgerTransactionStatusSchema = {
  params: z.object({
    academyId: id,
    ledgerTransactionId: id,
  }),

  body: z.object({
    ledgerTransactionStatus,
  }),
};