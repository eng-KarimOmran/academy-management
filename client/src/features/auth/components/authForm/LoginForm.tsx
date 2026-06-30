import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { LoginSchema } from "../../auth.schema";
import { login } from "../../api/auth.service";
import type { LoginDto } from "../../auth.dto";
import type { Auth } from "../../auth.type";

export default function LoginForm() {
  const config: FormProps<LoginDto["body"], Auth> = {
    inputs: [
      {
        name: "phone",
        type: "tel",
        label: "رقم الهاتف",
        placeholder: "01xxxxxxxxx",
      },
      {
        name: "password",
        type: "password",
        label: "كلمة المرور",
      },
    ],

    schema: LoginSchema.body,

    submitButton: {
      text: "تسجيل الدخول",
      loadingText: "جاري تسجيل الدخول...",
    },

    service: (data) => login({ body: data }),

    onSuccess: async () => {
      window.location.reload();
    },
  };

  return <Form {...config} />;
}