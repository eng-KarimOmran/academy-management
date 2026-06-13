import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { SubscriptionBase } from "@/types/subscription";
import type { CancelSubscriptionDto } from "@/DTOs/subscription.dto";

import { cancelSubscription } from "@/service/subscription.service";
import { CancelSubscriptionSchema } from "@/validations/subscription.validation";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { useDialogState } from "@/store/DialogState";

export default function CancelSubscription({
  item,
}: {
  item: SubscriptionBase;
}) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CancelSubscriptionDto, SubscriptionBase> = {
    inputs: [],

    defaultValues: {
      academyId: item.academy.id,
      subscriptionId: item.id,
    },

    schema: CancelSubscriptionSchema,

    submitButton: {
      text: "إلغاء الاشتراك",
      loadingText: "جاري الإلغاء...",
    },

    service: (data) => cancelSubscription(data),

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