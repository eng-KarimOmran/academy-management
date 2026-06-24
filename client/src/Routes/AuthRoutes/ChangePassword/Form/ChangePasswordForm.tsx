import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { ChangePasswordDto } from "@/DTOs/auth.dto";
import { queryClient } from "@/lib/queryClient";
import { changePassword } from "@/service/auth.service";
import { useAuthState } from "@/store/AuthState";
import { useDialogState } from "@/store/DialogState";
import type { UserAuth } from "@/types/user";
import { changePasswordSchema } from "@/validations/auth.validation";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const { setUser } = useAuthState();
  const { setConfigDialog } = useDialogState();

  const config: FormProps<ChangePasswordDto["body"], UserAuth> = {
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
    ],

    schema: changePasswordSchema.body,

    submitButton: {
      text: "تغير كلمة المرور",
      loadingText: "جاري تغير كلمة المرور...",
    },

    service: (data) => changePassword({ body: data }),

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