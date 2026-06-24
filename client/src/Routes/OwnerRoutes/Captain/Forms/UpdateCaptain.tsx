import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { updateCaptain } from "@/service/captain.service";
import { UpdateCaptainSchema } from "@/validations/captain.validation";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { enumTranslations } from "@/lib/enumTranslations";
import { useDialogState } from "@/store/DialogState";
import type { Captain } from "@/types/captain";
import type { UpdateDto } from "@/DTOs/captain.dto";
import { SupportType } from "@/types/enums";

export default function UpdateCaptain({
  item,
}: {
  item: Pick<
    Captain,
    "id" | "captainLessonPrice" | "isActive" | "supportType" | "academyId"
  >;
}) {
  const { setConfigDialog } = useDialogState();

  const params: UpdateDto["params"] = {
    captainId: item.id,
    academyId: item.academyId,
  };

  const config: FormProps<UpdateDto["body"], Captain> = {
    inputs: [
      {
        name: "isActive",
        type: "switch",
        label: "حالة النشاط",
      },
      {
        name: "captainLessonPrice",
        type: "number",
        label: "سعر الحصة",
        placeholder: "0",
        col: "half",
      },
      {
        name: "supportType",
        type: "select",
        label: "نوع التدريب",
        placeholder: "اختر نوع التدريب",
        options: SupportType.map((t) => ({
          label: enumTranslations[t] || t,
          value: t,
        })),
        col: "half",
      },
    ],

    defaultValues: {
      captainLessonPrice: item.captainLessonPrice,
      supportType: item.supportType,
      isActive: item.isActive,
    },

    schema: UpdateCaptainSchema.body,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري حفظ التعديلات...",
    },

    service: (data) => updateCaptain({ params, body: data }),

    onSuccess: () => {
      toast.success("تم تعديل بيانات الكابتن بنجاح");
      queryClient.invalidateQueries({ queryKey: ["captains"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
