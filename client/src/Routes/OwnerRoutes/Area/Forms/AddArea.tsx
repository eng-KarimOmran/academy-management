import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import { CreateAreaSchema } from "@/validations/area.validation";
import { createArea } from "@/service/area.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Area } from "@/types/area";
import { useDialogState } from "@/store/DialogState";
import { SupportType } from "@/types/enums";
import type { CreateDto } from "@/DTOs/area.dto";

export default function AddArea() {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CreateDto["body"], Area> = {
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
        options: SupportType.map((t) => ({
          label: enumTranslations[t],
          value: t,
        })),
      },
    ],

    defaultValues: {
      supportType: "BOTH",
    },

    schema: CreateAreaSchema.body,

    submitButton: {
      text: "إضافة المنطقة",
      loadingText: "جاري إضافة المنطقة...",
    },

    service: (data) => createArea({ body: data }),

    onSuccess: () => {
      toast.success("تم إضافة المنطقة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
