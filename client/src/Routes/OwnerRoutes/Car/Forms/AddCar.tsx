import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CreateDto } from "@/DTOs/car.dto";
import { CreateCarSchema } from "@/validations/car.validation";
import { createCar } from "@/service/car.service";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { Transmission } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Car } from "@/types/car";
import { useDialogState } from "@/store/DialogState";

export default function AddCar() {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CreateDto["body"], Car> = {
    inputs: [
      {
        name: "modelName",
        type: "text",
        label: "موديل السيارة",
        placeholder: "مثال: تويوتا كورولا 2024",
      },
      {
        name: "plateNumber",
        type: "text",
        label: "رقم اللوحة",
        placeholder: "أ ب ج 123",
      },
      {
        name: "gearType",
        type: "select",
        label: "ناقل الحركة",
        placeholder: "اختر نوع الناقل",
        options: Transmission.map((t) => ({
          label: enumTranslations[t] || t,
          value: t,
        })),
        col: "half",
      },
      {
        name: "carSessionPrice",
        type: "number",
        label: "سعر الحصة",
        placeholder: "0",
        col: "half",
      },
    ],

    defaultValues: {
      gearType: "AUTOMATIC",
    },

    schema: CreateCarSchema.body,

    submitButton: {
      text: "إضافة السيارة الجديدة",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createCar({ body: data }),

    onSuccess: () => {
      toast.success("تم إضافة السيارة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
