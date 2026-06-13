import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CreatePaymentTransactionDto } from "@/DTOs/transaction.dto";

import { createPaymentTransaction } from "@/service/transaction.service";
import { CreatePaymentTransactionSchema } from "@/validations/transaction.validation";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { PaymentMethod, TransactionType } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Payment } from "@/types/transaction";
import { useDialogState } from "@/store/DialogState";

export default function AddTransaction({
  academyId,
  subscriptionId,
}: {
  academyId: string;
  subscriptionId?: string;
}) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CreatePaymentTransactionDto, Payment> = {
    inputs: [
      {
        name: "amount",
        type: "number",
        label: "المبلغ",
        placeholder: "أدخل المبلغ",
      },

      {
        name: "paymentMethod",
        type: "select",
        label: "طريقة الدفع",
        options: PaymentMethod.map((value) => ({
          label: enumTranslations[value],
          value,
        })),
      },
      {
        name: "type",
        type: "select",
        label: "نوع العملية",
        options: TransactionType.map((value) => ({
          label: enumTranslations[value],
          value,
        })),
      },
      {
        name: "proofImage",
        type: "img",
        label: "صورة اثبات الدفع",
      },
      {
        name: "subscriptionId",
        type: "text",
        label: "رقم الاشتراك",
        placeholder: "أدخل ID الاشتراك",
        disabled: !!subscriptionId,
      },
    ],

    defaultValues: {
      subscriptionId: subscriptionId ?? "",
      academyId,
      amount: 0,
      paymentMethod: PaymentMethod[0],
      type: TransactionType[0],
    },

    schema: CreatePaymentTransactionSchema,

    submitButton: {
      text: "إضافة معاملة",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createPaymentTransaction(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions", academyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      toast.success("تم إضافة المعاملة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
