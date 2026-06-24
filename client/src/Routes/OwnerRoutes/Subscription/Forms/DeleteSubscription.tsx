import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { SubscriptionBase } from "@/types/subscription";
import { deleteSubscription } from "@/service/subscription.service";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";
import type { DeleteSubscriptionDto } from "@/DTOs/subscription.dto";

export default function DeleteSubscription({
  item,
}: {
  item: SubscriptionBase;
}) {
  const { setConfigDialog } = useDialogState();

  const params: DeleteSubscriptionDto["params"] = {
    academyId: item.academy.id,
    subscriptionId: item.id,
  };

  const clientName = item.client.name;

  const config: FormProps<{ name: string }, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "${clientName}" لتأكيد الحذف`,
        placeholder: "اكتب اسم العميل",
      },
    ],

    schema: matchSchema("name", "اسم العميل", clientName),

    submitButton: {
      text: "حذف الاشتراك",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () => deleteSubscription({ params }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions", item.academy.id],
      });
      queryClient.invalidateQueries({ queryKey: ["clients", item.academy.id] });
      toast.success("تم حذف الاشتراك بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
