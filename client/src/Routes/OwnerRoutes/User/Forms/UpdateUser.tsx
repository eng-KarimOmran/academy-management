import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { updateUser } from "@/service/user.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { UpdateUserSchema } from "@/validations/user.validation";

import type { User } from "@/types/user";
import type { UpdateUserDto } from "@/DTOs/user.dto";
import { useDialogState } from "@/store/DialogState";

export default function UpdateUser({ item }: { item: User }) {
  const { setConfigDialog } = useDialogState();

  const params: UpdateUserDto["params"] = { userId: item.id };

  const config: FormProps<UpdateUserDto["body"], User> = {
    inputs: [
      {
        name: "isActive",
        type: "switch",
        label: "حالة النشاط",
      },
      {
        name: "name",
        type: "text",
        label: "الاسم",
        placeholder: "اسم المستخدم",
        col: "half",
      },
      {
        name: "phone",
        type: "text",
        label: "رقم الهاتف",
        placeholder: "01xxxxxxxxx",
        col: "half",
      },
    ],

    defaultValues: {
      name: item.name,
      phone: item.phone,
      isActive: item.isActive,
    },

    schema: UpdateUserSchema.body,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateUser({ body: data, params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم تعديل بيانات المستخدم بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
