import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import { CreateCaptainSchema } from "@/validations/captain.validation";
import { createCaptain } from "@/service/captain.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { enumTranslations } from "@/lib/enumTranslations";
import { useDialogState } from "@/store/DialogState";
import type { CreateDto } from "@/DTOs/captain.dto";
import { SupportType } from "@/types/enums";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import type { Captain } from "@/types/captain";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/service/user.service";
import { useEffect } from "react";

export default function AddCaptain({
  user,
}: {
  user?: { userId: string; name: string; phone: string };
}) {
  const { setConfigDialog } = useDialogState();
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id ?? "";

  const params: CreateDto["params"] = { academyId };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getAllUsers({
        query: {
          page: 1,
          limit: 50,
        },
      }),
    enabled: !user,
    select: (res) => res.data.data,
  });

  const users = data?.items.filter((u) => !u.roles.includes("CAPTAIN")) ?? [];

  useEffect(() => {
    if (error) {
      toast.error(error?.message ?? "خطأ في تحميل المستخدمين");
    }
  }, [error]);

  const config: FormProps<CreateDto["body"], Captain> = {
    inputs: [
      {
        name: "userId",
        type: "select",
        label: "المستخدم",
        placeholder: isLoading ? "جاري تحميل المستخدمين" : "اختار المستخدم",
        options: user
          ? [
              {
                label: `${user.name}-${user.phone}`,
                value: user.userId,
              },
            ]
          : users.map((u) => ({
              label: `${u.name}-${u.phone}`,
              value: u.id,
            })),
        disabled: !!user || isLoading,
      },
      {
        name: "captainLessonPrice",
        type: "number",
        label: "سعر الحصة",
        placeholder: "0",
        col: "half",
      },
      {
        name: "baseSalary",
        type: "number",
        label: "الراتب الاساسي",
        placeholder: "0",
        col: "half",
      },
      {
        name: "supportType",
        type: "select",
        label: "نوع التدريب",
        placeholder: "اختر نوع التدريب",
        options: SupportType.map((t) => ({
          label: enumTranslations[t] || t,
          value: t,
        })),
        col: "full",
      },
    ],

    defaultValues: {
      userId: user?.userId ?? "",
      supportType: "BOTH",
    },

    schema: CreateCaptainSchema.body,

    submitButton: {
      text: "إضافة الكابتن",
      loadingText: "جاري إضافة الكابتن...",
      disabled: !!academyId,
    },

    service: (data) => createCaptain({ body: data, params }),

    onSuccess: () => {
      toast.success("تم إضافة الكابتن بنجاح");
      queryClient.invalidateQueries({ queryKey: ["captains"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
