import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CaptainBass } from "@/types/captain";
import type { UpdateCaptainDto } from "@/DTOs/captain.dto";

import { updateCaptain } from "@/service/captain.service";
import { UpdateCaptainSchema } from "@/validations/captain.validation";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { TrainingSupport } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import { useDialogState } from "@/store/DialogState";

export default function UpdateCaptain({ item }: { item: CaptainBass }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<UpdateCaptainDto, CaptainBass> = {
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
        name: "trainingType",
        type: "select",
        label: "نوع التدريب",
        placeholder: "اختر نوع التدريب",
        options: TrainingSupport.map((t) => ({
          label: enumTranslations[t] || t,
          value: t,
        })),
        col: "half",
      },
    ],

    defaultValues: {
      captainLessonPrice: item.captainLessonPrice,
      trainingType: item.trainingType,
      isActive: item.isActive,
    },

    schema: UpdateCaptainSchema,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري حفظ التعديلات...",
    },

    service: (data) => updateCaptain(item.id, data),

    onSuccess: () => {
      toast.success("تم تعديل بيانات الكابتن بنجاح");
      queryClient.invalidateQueries({ queryKey: ["captains"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
