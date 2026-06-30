import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { queryClient } from "@/lib/queryClient";
import { useUserProfileState } from "@/store/UserDetailsState";

import { changePasswordSchema } from "../../auth.schema";
import { changePassword } from "../../api/auth.service";
import type { ChangePasswordDto } from "../../auth.dto";

import { useDialogState } from "@/store/DialogState";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const { setUserProfile } = useUserProfileState();
  const { setConfigDialog } = useDialogState();

  const config: FormProps<ChangePasswordDto["body"], boolean> = {
    inputs: [
      {
        name: "newPassword",
        type: "password",
        label: "كلمة المرور الحالية",
      },
      {
        name: "currentPassword",
        type: "password",
        label: "كلمة المرور الجديده",
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
      setUserProfile(null);
      queryClient.clear();
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
