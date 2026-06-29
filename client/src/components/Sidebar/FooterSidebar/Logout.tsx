import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { logout } from "@/service/auth.service";
import { queryClient } from "@/lib/queryClient";
import { useUserDetailsState } from "@/store/UserDetailsState";

import { LogoutSchema } from "@/validations/auth.validation";

import type { LogoutDto } from "@/DTOs/auth.dto";
import { useDialogState } from "@/store/DialogState";

export default function Logout() {
  const { setUser } = useUserDetailsState();
  const { setConfigDialog } = useDialogState();

  const config: FormProps<LogoutDto, null> = {
    inputs: [
      {
        name: "allDevices",
        type: "switch",
        label: "تسجيل الخروج من جميع الأجهزة",
      },
    ],

    defaultValues: {
      allDevices: false,
    },

    schema: LogoutSchema,

    submitButton: {
      text: "تأكيد الخروج",
      loadingText: "جاري تسجيل الخروج...",
      variant: "destructive",
    },

    service: (data) => logout(data.allDevices),

    onSuccess: async () => {
      await queryClient.cancelQueries();
      setUser(null);
      queryClient.clear();
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
