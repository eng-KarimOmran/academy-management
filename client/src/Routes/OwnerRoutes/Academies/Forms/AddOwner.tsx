import Form, { type FormProps } from "@/components/Form/Form";
import type { AddOwnerDto } from "@/DTOs/academy.dto";
import { queryClient } from "@/lib/queryClient";
import { addOwner } from "@/service/academy.service";
import { getAllUsers } from "@/service/user.service";
import { useDialogState } from "@/store/DialogState";
import type { Academy } from "@/types/academy";
import { AddOwnerSchema } from "@/validations/academy.validation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AddOwner({
  academyId,
  ownersId,
}: {
  academyId: string;
  ownersId: string[];
}) {
  const { setConfigDialog } = useDialogState();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "active"],
    queryFn: () =>
      getAllUsers({
        query: {
          page: 1,
          limit: 50,
          isActive: true,
        },
      }),
    select: (res) => res.data.data,
  });

  const users = data?.items.filter((u) => !ownersId.includes(u.id)) ?? [];

  useEffect(() => {
    if (error) {
      toast.error(error?.message ?? "خطأ في تحميل المستخدمين");
    }
  }, [error]);

  const config: FormProps<AddOwnerDto["params"], Academy> = {
    inputs: [
      {
        name: "userId",
        type: "select",
        label: "اختار المستخدم",
        placeholder: isLoading ? "جاري تحميل المستخدمين..." : "اختار المستخدم",
        options: users.map((u) => ({
          label: `${u.name}-${u.phone}`,
          value: u.id,
        })),
      },
    ],
    submitButton: {
      loadingText: "جاري اضافة مالك للأكادمية",
      text: "اضافة المالك",
    },
    schema: AddOwnerSchema.params,
    defaultValues: {
      academyId,
    },
    service: (data) => addOwner({ params: data }),
    onSuccess: () => {
      toast.success("تم اضافة المالك بنجاح");
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      setConfigDialog(null);
    },
  };
  return <Form {...config} />;
}
