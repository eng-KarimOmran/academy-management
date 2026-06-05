import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { deleteSecretary } from "@/service/secretary.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import type { Secretary } from "@/types/secretary";
import { useDialogState } from "@/store/DialogState";

export default function DeleteSecretary({ item }: { item: Secretary }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<{ name: string }, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "${item.user.name}" لتأكيد الحذف`,
        placeholder: "اكتب الاسم للتأكيد",
      },
    ],

    defaultValues: {
      name: "",
    },

    schema: matchSchema("name", "السكرتير", item.user.name),

    submitButton: {
      text: "حذف",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () =>
      deleteSecretary({
        secretaryId: item.id,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secretaries"] });

      toast.success("تم حذف السكرتير بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
