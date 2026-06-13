import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { CreateAcademyDto } from "@/DTOs/academy.dto";
import { queryClient } from "@/lib/queryClient";
import { createAcademy } from "@/service/academy.service";
import { useDialogState } from "@/store/DialogState";
import type { Academy } from "@/types/academy";
import { CreateAcademySchema } from "@/validations/academy.validation";
import { toast } from "sonner";

export default function AddAcademy() {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CreateAcademyDto, Academy> = {
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
        label: "انستا باي",
        placeholder: "اكتب حساب انستا باي",
      },
      {
        name: "address",
        type: "textarea",
        label: "العنوان",
        placeholder: "اكتب العنوان",
      },
      {
        name: "phone",
        type: "tel",
        label: "رقم تواصل الأكاديمية",
        placeholder: "01xxxxxxxxx :مثال",
        col: "half",
      },
      {
        name: "owner",
        type: "tel",
        label: "رقم هاتف المالك (المسجل)",
        placeholder: "أدخل رقم هاتف صاحب الصلاحية",
        col: "half",
      },
    ],
    submitButton: {
      loadingText: "جاري اضافة الأكادمية",
      text: "اضافة الأكادمية",
    },
    schema: CreateAcademySchema,
    service: (data) => createAcademy(data),
    onSuccess: () => {
      toast.success("تم اضافة الأكادمية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      setConfigDialog(null);
    },
  };
  return <Form {...config} />;
}
