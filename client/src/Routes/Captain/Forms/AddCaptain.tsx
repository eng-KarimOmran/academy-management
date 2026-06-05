import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { CreateCaptainDto } from "@/DTOs/captain.dto";
import { CreateCaptainSchema } from "@/validations/captain.validation";
import { createCaptain } from "@/service/captain.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { TrainingSupport } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Captain } from "@/types/captain";
import { useDialogState } from "@/store/DialogState";

export default function AddCaptain({ phone }: { phone?: string }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CreateCaptainDto, Captain> = {
    inputs: [
      {
        name: "phone",
        type: "text",
        label: "رقم الهاتف",
        placeholder: "01xxxxxxxxx",
        disabled: !!phone,
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
      phone: phone ?? "",
      captainLessonPrice: 0,
      trainingType: "BOTH",
    },

    schema: CreateCaptainSchema,

    submitButton: {
      text: "إضافة الكابتن",
      loadingText: "جاري إضافة الكابتن...",
    },

    service: (data) => createCaptain(data),

    onSuccess: () => {
      toast.success("تم إضافة الكابتن بنجاح");
      queryClient.invalidateQueries({ queryKey: ["captains"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
