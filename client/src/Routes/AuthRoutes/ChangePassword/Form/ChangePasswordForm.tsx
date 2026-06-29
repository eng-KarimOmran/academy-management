import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { ChangePasswordDto } from "@/DTOs/auth.dto";
import { queryClient } from "@/lib/queryClient";
import { changePassword } from "@/service/auth.service";
import { useUserDetailsState } from "@/store/UserDetailsState";
import { useDialogState } from "@/store/DialogState";
import { changePasswordSchema } from "@/validations/auth.validation";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const { setUser } = useUserDetailsState();
  const { setConfigDialog } = useDialogState();

  const config: FormProps<ChangePasswordDto["body"], boolean> = {
    inputs: [
      {
        name: "newPassword",
        type: "password",
        label: "كلمة المرور الحالية",
        col: "half",
      },
      {
        name: "currentPassword",
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
