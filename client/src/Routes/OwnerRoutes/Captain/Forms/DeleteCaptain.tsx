import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { deleteCaptain } from "@/service/captain.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";
import type { Captain } from "@/types/captain";
import type { DeleteDto } from "@/DTOs/captain.dto";

export default function DeleteCaptain({
  item,
}: {
  item: Pick<Captain, "id" | "academyId">;
}) {
  const { setConfigDialog } = useDialogState();
  const params: DeleteDto["params"] = {
    captainId: item.id,
    academyId: item.academyId,
  };

  const config: FormProps<{ name: string }, Captain> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "تأكيد" للموافقة على حذف ملف الكابتن`,
        placeholder: "اكتب تأكيد",
      },
    ],

    schema: matchSchema("name", "كلمة التأكيد", "تأكيد"),

    submitButton: {
      text: "حذف",
      loadingText: "جاري حذف الكابتن...",
      variant: "destructive",
    },

    service: () => deleteCaptain({ params }),

    onSuccess: () => {
      toast.success("تم حذف الكابتن بنجاح");
      queryClient.invalidateQueries({ queryKey: ["captains"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
