import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { queryClient } from "@/lib/queryClient";
import { useUserProfileState } from "@/store/UserDetailsState";

import { useDialogState } from "@/store/DialogState";
import { LogoutSchema } from "../../auth.schema";
import { logout } from "../../api/auth.service";
import type { LogoutDto } from "../../auth.dto";

export default function LogoutForm() {
  const { setUserProfile } = useUserProfileState();
  const { setConfigDialog } = useDialogState();

  const config: FormProps<LogoutDto["query"], null> = {
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

    schema: LogoutSchema["query"],

    submitButton: {
      text: "تأكيد الخروج",
      loadingText: "جاري تسجيل الخروج...",
      variant: "destructive",
    },

    service: ({ allDevices }) => {
      const params: LogoutDto = {
        query: {
          allDevices,
        },
      };

      return logout(params);
    },

    onSuccess: async () => {
      await queryClient.cancelQueries();
      setUserProfile(null);
      queryClient.clear();
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}