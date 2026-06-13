import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { ChangePasswordDto } from "@/DTOs/auth.dto";
import { queryClient } from "@/lib/queryClient";
import { changePassword } from "@/service/auth.service";
import { useAuthState } from "@/store/AuthState";
import { useDialogState } from "@/store/DialogState";
import type { UserAuth } from "@/types/user";
import { ChangePasswordSchema } from "@/validations/auth.validation";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const { setUser } = useAuthState();
  const { setConfigDialog } = useDialogState();

  const config: FormProps<ChangePasswordDto, UserAuth> = {
    inputs: [
      {
        name: "password",
        type: "password",
        label: "كلمة المرور الحالية",
      },
      {
        name: "newPassword",
        type: "password",
        label: "كلمة المرور الجديده",
        col: "half",
      },
      {
        name: "confirmNewPassword",
        type: "password",
        label: "تأكيد كلمة المرور",
        col: "half",
      },
    ],

    defaultValues: {
      confirmNewPassword: "",
      newPassword: "",
      password: "",
    },

    schema: ChangePasswordSchema,

    submitButton: {
      text: "تغير كلمة المرور",
      loadingText: "جاري تغير كلمة المرور...",
    },

    service: (data) => changePassword(data),

    onSuccess: async () => {
      toast.success("تم تغير كلمة المرور بنجاح");
      await queryClient.cancelQueries();
      setUser(null);
      queryClient.clear();
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
