import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { UpdatePaymentTransactionDto } from "@/DTOs/transaction.dto";

import { updatePaymentTransaction } from "@/service/transaction.service";
import { UpdatePaymentTransactionSchema } from "@/validations/transaction.validation";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { PaymentMethod, Status } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Payment } from "@/types/transaction";
import { useDialogState } from "@/store/DialogState";

export default function UpdateTransaction({ item }: { item: Payment }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<UpdatePaymentTransactionDto, Payment> = {
    inputs: [
      {
        name: "amount",
        type: "number",
        label: "المبلغ",
        col: "half",
      },

      {
        name: "paymentMethod",
        type: "select",
        label: "طريقة الدفع",
        options: PaymentMethod.map((value) => ({
          label: enumTranslations[value],
          value,
        })),
        col: "half",
      },

      {
        name: "status",
        type: "select",
        label: "الحالة",
        options: Status.map((value) => ({
          label: enumTranslations[value],
          value,
        })),
      },
    ],

    defaultValues: {
      paymentId: item.id,
      academyId: item.academy.id,
      amount: item.amount,
      paymentMethod: item.paymentMethod,
      status: item.status,
    },

    schema: UpdatePaymentTransactionSchema,

    submitButton: {
      text: "تحديث المعاملة",
      loadingText: "جاري التحديث...",
    },

    service: (data) => updatePaymentTransaction(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("تم تحديث المعاملة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
