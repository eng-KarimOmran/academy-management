import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { UpdateAreaDto } from "@/DTOs/area.dto";
import { UpdateAreaSchema } from "@/validations/area.validation";
import { updateArea } from "@/service/area.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { TrainingSupport } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Area } from "@/types/area";
import { useDialogState } from "@/store/DialogState";

export default function UpdateArea({ item }: { item: Area }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<UpdateAreaDto, Area> = {
    inputs: [
      {
        name: "isActive",
        type: "switch",
        label: "حالة النشاط",
      },
      {
        name: "name",
        type: "text",
        label: "اسم المنطقة",
        placeholder: "مثال: القاهرة الجديدة",
      },
      {
        name: "supportType",
        type: "select",
        label: "نوع الدعم",
        placeholder: "اختر نوع الدعم",
        options: TrainingSupport.map((t) => ({
          label: enumTranslations[t] || t,
          value: t,
        })),
      },
    ],

    defaultValues: {
      name: item.name,
      supportType: item.supportType,
      isActive: item.isActive,
    },

    schema: UpdateAreaSchema,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateArea(item.id, data),

    onSuccess: () => {
      toast.success("تم تعديل المنطقة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
