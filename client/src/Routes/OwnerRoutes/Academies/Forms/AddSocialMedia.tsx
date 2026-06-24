import Form, { type FormProps } from "@/components/Form/Form";
import type { AddSocialMediaDto } from "@/DTOs/academy.dto";
import { enumTranslations } from "@/lib/enumTranslations";
import { queryClient } from "@/lib/queryClient";
import { addSocialMedia } from "@/service/academy.service";
import { useDialogState } from "@/store/DialogState";
import type { Academy } from "@/types/academy";
import { Platform } from "@/types/enums";
import { AddSocialMediaSchema } from "@/validations/academy.validation";
import { toast } from "sonner";

export default function AddSocialMedia({ academyId }: { academyId: string }) {
  const { setConfigDialog } = useDialogState();
  const params: AddSocialMediaDto["params"] = { academyId };

  const config: FormProps<AddSocialMediaDto["body"], Academy> = {
    inputs: [
      {
        name: "platform",
        type: "select",
        label: "المنصة",
        placeholder: "اختار المنصة",
        options: Platform.map((p) => ({
          label: enumTranslations[p],
          value: p,
        })),
      },
      {
        name: "url",
        type: "url",
        label: "رابط المنصة",
        placeholder: "اكتب رابط المنصة",
      },
    ],
    submitButton: {
      loadingText: "جاري اضافة المنصة للأكادمية",
      text: "اضافة المنصة",
    },
    schema: AddSocialMediaSchema.body,
    service: (data) => addSocialMedia({ body: data, params }),
    onSuccess: () => {
      toast.success("تم اضافة المالك بنجاح");
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      setConfigDialog(null);
    },
  };
  return <Form {...config} />;
}
