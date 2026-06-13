import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { CreateAreaDto } from "@/DTOs/area.dto";
import { CreateAreaSchema } from "@/validations/area.validation";
import { createArea } from "@/service/area.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { TrainingSupport } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Area } from "@/types/area";
import { useDialogState } from "@/store/DialogState";

export default function AddArea() {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CreateAreaDto, Area> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: "اسم المنطقة",
        placeholder: "الشاطبي",
      },
      {
        name: "supportType",
        type: "select",
        label: "نوع الدعم",
        placeholder: "اختر نوع الدعم",
        options: TrainingSupport.map((t) => ({
          label: enumTranslations[t],
          value: t,
        })),
      },
    ],

    defaultValues: {
      name: "",
      supportType: "BOTH",
    },

    schema: CreateAreaSchema,

    submitButton: {
      text: "إضافة المنطقة",
      loadingText: "جاري إضافة المنطقة...",
    },

    service: (data) => createArea(data),

    onSuccess: () => {
      toast.success("تم إضافة المنطقة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
