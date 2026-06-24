import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { CreateAcademyDto } from "@/DTOs/academy.dto";
import { queryClient } from "@/lib/queryClient";
import { createAcademy } from "@/service/academy.service";
import { getAllUsers } from "@/service/user.service";
import { useDialogState } from "@/store/DialogState";
import type { Academy } from "@/types/academy";
import { CreateAcademySchema } from "@/validations/academy.validation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AddAcademy() {
  const { setConfigDialog } = useDialogState();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getAllUsers({ query: { isActive: true, limit: 50, page: 1 } }),
    select: (res) => res.data.data.items,
  });

  const config: FormProps<CreateAcademyDto["body"], Academy> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: "اسم الأكاديمية",
        placeholder: "اكتب اسم الأكاديمية",
      },
      {
        name: "paymentLink",
        type: "url",
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
        name: "ownerId",
        type: "select",
        label: "اختار مالك الأكادمية",
        placeholder: data.length ? "اختار المستخدم" : "لا يوجد مستخدمين",
        col: "half",
        options: data.map((u) => ({
          label: `${u.name.split(" ")[0]}-${u.phone}`,
          value: u.id,
        })),
        disabled: isLoading || !!error,
      },
    ],
    submitButton: {
      loadingText: "جاري اضافة الأكادمية",
      text: "اضافة الأكادمية",
    },
    schema: CreateAcademySchema.body,
    service: (data) => createAcademy({ body: data }),
    onSuccess: () => {
      toast.success("تم اضافة الأكادمية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      setConfigDialog(null);
    },
  };
  return <Form {...config} />;
}
