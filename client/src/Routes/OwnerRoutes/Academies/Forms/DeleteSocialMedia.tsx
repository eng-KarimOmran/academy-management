import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { DeleteSocialMediaDto } from "@/DTOs/academy.dto";
import { matchSchema } from "@/lib/matchSchema";
import { queryClient } from "@/lib/queryClient";
import { deleteSocialMedia } from "@/service/academy.service";
import { useDialogState } from "@/store/DialogState";
import type { Academy } from "@/types/academy";
import { toast } from "sonner";

export default function DeleteSocialMedia({
  academyId,
  platformId,
}: {
  academyId: string;
  platformId: string;
}) {
  const { setConfigDialog } = useDialogState();
  const params: DeleteSocialMediaDto["params"] = { academyId, platformId };

  const config: FormProps<{ text: string }, Academy> = {
    inputs: [
      {
        name: "text",
        type: "text",
        label: `اكتب ( حذف ) لتأكيد الحذف`,
        placeholder: `اكتب حذف`,
      },
    ],

    schema: matchSchema("text", "كلمة التأكيد", "حذف"),

    submitButton: {
      text: "حذف",
      loadingText: "جاري حذف الأكاديمية...",
      variant: "destructive",
    },

    service: async () => deleteSocialMedia({ params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      toast.success("تم حذف الأكاديمية بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
