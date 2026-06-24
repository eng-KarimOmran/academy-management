import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Car } from "@/types/car";

import { updateCar } from "@/service/car.service";
import { UpdateCarSchema } from "@/validations/car.validation";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { Transmission } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import { useDialogState } from "@/store/DialogState";
import type { UpdateDto } from "@/DTOs/car.dto";

export default function UpdateCar({ item }: { item: Car }) {
  const { setConfigDialog } = useDialogState();
  const params: UpdateDto["params"] = { carId: item.id };

  const config: FormProps<UpdateDto["body"], Car> = {
    inputs: [
      {
        name: "isActive",
        type: "switch",
        label: "حالة السيارة",
      },
      {
        name: "modelName",
        type: "text",
        label: "موديل السيارة",
      },
      {
        name: "plateNumber",
        type: "text",
        label: "رقم اللوحة",
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
        col: "half",
      },
    ],

    defaultValues: {
      modelName: item.modelName,
      plateNumber: item.plateNumber,
      gearType: item.gearType,
      carSessionPrice: Number(item.carSessionPrice ?? 0),
      isActive: item.isActive,
    },

    schema: UpdateCarSchema.body,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateCar({ body: data, params }),

    onSuccess: () => {
      toast.success("تم تعديل السيارة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}