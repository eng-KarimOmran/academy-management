import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { ChangePaymentStatusDto } from "@/DTOs/transaction.dto";

import { changePaymentStatus } from "@/service/transaction.service";
import { ChangePaymentStatusSchema } from "@/validations/transaction.validation";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { StatusInput } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Payment } from "@/types/transaction";
import { useDialogState } from "@/store/DialogState";

export default function UpdateTransaction({ item }: { item: Payment }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<ChangePaymentStatusDto, Payment> = {
    inputs: [
      {
        name: "status",
        type: "select",
        label: "الحالة",
        options: StatusInput.map((value) => ({
          label: enumTranslations[value],
          value,
        })),
      },
    ],

    defaultValues: {
      paymentId: item.id,
      academyId: item.academy.id,
      status: "COMPLETED",
    },

    schema: ChangePaymentStatusSchema,

    submitButton: {
      text: "تحديث المعاملة",
      loadingText: "جاري التحديث...",
    },

    service: (data) => changePaymentStatus(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("تم تحديث المعاملة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
