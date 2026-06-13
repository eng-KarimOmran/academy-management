import Form, { type FormProps } from "@/components/Form/Form";
import type { CreateUserDto } from "@/DTOs/user.dto";
import { signup } from "@/service/auth.service";
import { CreateUserSchema } from "@/validations/user.validation";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignUp() {
  const navigate = useNavigate();

  const config: FormProps<CreateUserDto, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: "الاسم",
        placeholder: "مثال: محمد احمد",
      },
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

    defaultValues: {
      phone: "",
      password: "",
      name: "",
    },

    schema: CreateUserSchema,

    submitButton: {
      text: "تسجيل الدخول",
      loadingText: "جاري تسجيل الدخول...",
    },

    service: (data) => signup(data),

    onSuccess: () => {
      navigate("/", { replace: true });
      toast.success("تم تسجيل المستخدم بنجاح");
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
            مرحباً بك
          </h1>
          <p className="text-sm text-muted-foreground">
            ادخل بيانات اول مستخدم
          </p>
        </header>

        <div className="w-full mt-2">
          <Form {...config} />
        </div>
      </main>
    </section>
  );
}
