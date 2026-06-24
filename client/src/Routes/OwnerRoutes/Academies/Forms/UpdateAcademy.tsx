import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { UpdateAcademyDto } from "@/DTOs/academy.dto";
import { queryClient } from "@/lib/queryClient";
import { updateAcademy } from "@/service/academy.service";
import { useDialogState } from "@/store/DialogState";
import type { Academy } from "@/types/academy";
import { UpdateAcademySchema } from "@/validations/academy.validation";
import { toast } from "sonner";

export default function UpdateAcademy({ item }: { item: Academy }) {
  const { setConfigDialog } = useDialogState();
  const params: UpdateAcademyDto["params"] = { academyId: item.id };

  const config: FormProps<UpdateAcademyDto["body"], Academy> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: "اسم الأكاديمية",
        placeholder: "اكتب اسم الأكاديمية",
      },
      {
        name: "paymentLink",
        type: "text",
        label: "رابط الدفع",
        placeholder: "example@instapay",
      },
      {
        name: "phone",
        type: "tel",
        label: "رقم تواصل الأكاديمية",
        placeholder: "01xxxxxxxxx :مثال",
      },
      {
        name: "address",
        type: "textarea",
        label: "العنوان",
        placeholder: "اكتب العنوان",
      },
    ],

    defaultValues: {
      name: item.name,
      address: item.address,
      paymentLink: item.paymentLink,
      phone: item.phone,
    },

    schema: UpdateAcademySchema.body,

    submitButton: {
      text: "تعديل بيانات الأكاديمية",
      loadingText: "جاري تعديل بيانات الأكاديمية",
    },

    service: (data) => updateAcademy({ body: data, params }),

    onSuccess: () => {
      toast.success("تم تعديل بيانات الأكاديمية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
