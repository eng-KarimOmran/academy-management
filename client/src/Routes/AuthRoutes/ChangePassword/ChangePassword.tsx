import { useAuthState } from "@/store/AuthState";
import ChangePasswordForm from "./Form/ChangePasswordForm";

export default function ChangePassword() {
  const { user } = useAuthState();
  if (!user) return;
  const isChangePassword = user.isPasswordChanged;
  
  return (
    <section
      className={`w-full flex justify-center items-center ${
        isChangePassword
          ? "p-4"
          : "min-h-dvh bg-gray-50/50 dark:bg-background p-4 sm:p-8"
      }`}
      dir="rtl"
    >
      <main className="w-full max-w-md p-6 sm:p-8 bg-card border border-border/50 rounded-2xl shadow-lg flex flex-col gap-6">
        <header className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <span className="text-xl font-bold text-primary">🔒</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            تغيير كلمة المرور
          </h1>

          <p
            className={`text-sm ${
              isChangePassword
                ? "text-muted-foreground"
                : "text-amber-600 dark:text-amber-400 font-medium"
            }`}
          >
            {isChangePassword
              ? "قم بتحديث كلمة المرور الخاصة بك بانتظام للحفاظ على أمان حسابك"
              : "يجب تغيير الباسورد للمتابعة في النظام"}
          </p>
        </header>

        <div className="w-full mt-2">
          <ChangePasswordForm />
        </div>
      </main>
    </section>
  );
}
