import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { CreateSecretarySchema } from "@/validations/secretary.validation";

import { createSecretary } from "@/service/secretary.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import type { Secretary } from "@/types/secretary";
import { useDialogState } from "@/store/DialogState";
import type { CreateDto } from "@/DTOs/secretary.dto";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/service/user.service";
import { useEffect } from "react";

export default function AddSecretary({
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

  const users = data?.items.filter((u) => !u.roles.includes("SECRETARY")) ?? [];

  useEffect(() => {
    if (error) {
      toast.error(error?.message ?? "خطأ في تحميل المستخدمين");
    }
  }, [error]);

  const config: FormProps<CreateDto["body"], Secretary> = {
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
        name: "baseSalary",
        type: "number",
        label: "المرتب الأساسي",
        placeholder: "3000",
        col: "third",
      },

      {
        name: "targetCount",
        type: "number",
        label: "التارجت",
        placeholder: "50",
        col: "third",
      },

      {
        name: "bonusAmount",
        type: "number",
        label: "البونص",
        placeholder: "500",
        col: "third",
      },
    ],

    defaultValues: {
      userId: user?.userId ?? "",
    },

    schema: CreateSecretarySchema.body,

    submitButton: {
      text: "إضافة سكرتير",
      loadingText: "جاري الإضافة...",
      disabled: !!academyId,
    },

    service: (data) => createSecretary({ body: data, params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secretaries"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم إضافة السكرتير بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
