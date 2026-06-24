import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { SubscriptionBase } from "@/types/subscription";
import type { CancelSubscriptionDto } from "@/DTOs/subscription.dto";

import { cancelSubscription } from "@/service/subscription.service";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { useDialogState } from "@/store/DialogState";
import { matchSchema } from "@/lib/matchSchema";

export default function CancelSubscription({
  item,
}: {
  item: SubscriptionBase;
}) {
  const { setConfigDialog } = useDialogState();

  const params: CancelSubscriptionDto["params"] = {
    academyId: item.academy.id,
    subscriptionId: item.id,
  };

  const config: FormProps<{ text: string }, SubscriptionBase> = {
    inputs: [
      {
        name: "text",
        type: "text",
        label: `اكتب "الغاء" لتأكيد الالغاء`,
        placeholder: `اكتب "الغاء" للتأكيد`,
      },
    ],

    schema: matchSchema("text", "كلمة التأكيد", "الغاء"),

    submitButton: {
      text: "حذف",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: () => cancelSubscription({ params }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions", item.academy.id],
      });
      queryClient.invalidateQueries({ queryKey: ["clients", item.academy.id] });

      toast.success("تم إلغاء الاشتراك بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
