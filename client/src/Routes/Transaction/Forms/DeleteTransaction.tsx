import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { deletePaymentTransaction } from "@/service/transaction.service";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import type { Payment } from "@/types/transaction";
import { useDialogState } from "@/store/DialogState";

export default function DeleteTransaction({ item }: { item: Payment }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<{ name: string }, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "${item.amount} ج.م" لتأكيد الحذف`,
        placeholder: "اكتب المبلغ للتأكيد",
      },
    ],

    defaultValues: {
      name: "",
    },

    schema: matchSchema("name", "المعاملة", String(item.amount)),

    submitButton: {
      text: "حذف المعاملة",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () =>
      deletePaymentTransaction({
        academyId: item.academy.id,
        paymentId: item.id,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("تم حذف المعاملة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
