import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CreateUserDto } from "@/DTOs/user.dto";
import { CreateUserSchema } from "@/validations/user.validation";

import { createUser } from "@/service/user.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import type { User } from "@/types/user";
import { useDialogState } from "@/store/DialogState";

export default function AddUser() {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CreateUserDto["body"], User> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: "اسم المستخدم",
        placeholder: "مثال: أحمد محمد علي",
        col: "full",
      },

      {
        name: "phone",
        type: "text",
        label: "رقم الهاتف",
        placeholder: "01xxxxxxxxx",
        col: "half",
      },

      {
        name: "password",
        type: "password",
        label: "كلمة المرور",
        placeholder: "********",
        col: "half",
      },
    ],

    schema: CreateUserSchema.body,

    submitButton: {
      text: "إضافة المستخدم",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createUser({ body: data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("تم إضافة المستخدم بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
