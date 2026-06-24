import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { deleteSecretary } from "@/service/secretary.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import type { Secretary } from "@/types/secretary";
import { useDialogState } from "@/store/DialogState";
import type { DeleteDto } from "@/DTOs/secretary.dto";

export default function DeleteSecretary({
  item,
}: {
  item: Pick<Secretary, "id" | "academyId">;
}) {
  const { setConfigDialog } = useDialogState();

  const params: DeleteDto["params"] = {
    academyId: item.academyId,
    secretaryId: item.id,
  };

  const config: FormProps<{ name: string }, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "حذف" لتأكيد الحذف`,
        placeholder: "اكتب الاسم للتأكيد",
      },
    ],

    schema: matchSchema("name", "كلمة التأكيد", "حذف"),

    submitButton: {
      text: "حذف",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () => deleteSecretary({ params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secretaries"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم حذف السكرتير بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
