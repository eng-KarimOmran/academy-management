import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { LoginSchema } from "@/validations/auth.validation";
import { login } from "@/service/auth.service";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import { useAuthState } from "@/store/AuthState";

import type { LoginDto } from "@/DTOs/auth.dto";
import type { UserAuth } from "@/types/user";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthState();

  const config: FormProps<LoginDto["body"], UserAuth> = {
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

    onSuccess: (res) => {
      if ("data" in res) {
        setUser(res.data);
      }
      navigate("/dashboard", { replace: true });
      toast.success("تم تسجيل الدخول بنجاح");
    },
  };

  return (
    <section
      className="w-full min-h-dvh flex justify-center items-center bg-gray-50/50 dark:bg-background p-4 sm:p-8"
      dir="rtl"
    >
      <main className="w-full max-w-md p-6 sm:p-8 bg-card border border-border/50 rounded-2xl shadow-lg flex flex-col gap-6">
        <header className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <span className="text-xl font-bold text-primary">👋</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            مرحباً بك مجدداً
          </h1>
          <p className="text-sm text-muted-foreground">
            قم بإدخال بياناتك للمتابعة إلى لوحة التحكم
          </p>
        </header>

        <div className="w-full mt-2">
          <Form {...config} />
        </div>
      </main>
    </section>
  );
}
