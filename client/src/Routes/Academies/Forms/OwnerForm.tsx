import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { updateAcademy } from "@/service/academy.service";
import type { User } from "@/types/user";
import type { FormProps } from "@/components/Form/Form";
import type { PhoneAcademyDto } from "@/DTOs/academy.dto";
import type { Academy } from "@/types/academy";
import { PhoneAcademySchema } from "@/validations/academy.validation";
import { matchSchema } from "@/lib/matchSchema";
import Form from "@/components/Form/Form";
import { useDialogState } from "@/store/DialogState";

type Mode = "add" | "update" | "delete";

type OwnerCtx = {
  academyId: string;
  oldData: User[];
  item?: User;
  mode: Mode;
};

export function OwnerForm({ academyId, oldData, item, mode }: OwnerCtx) {
  const { setConfigDialog } = useDialogState();
  const selectedPhone = item?.phone ?? "";

  const isDelete = mode === "delete";

  const config: FormProps<PhoneAcademyDto, Academy> = {
    inputs: [
      {
        name: "phone",
        type: "tel",
        label: isDelete
          ? `اكتب "${selectedPhone}" لتأكيد الحذف`
          : "رقم هاتف المالك",
        placeholder: isDelete ? "اكتب رقم المالك للتأكيد" : "01xxxxxxxxx",
      },
    ],

    defaultValues: {
      phone: isDelete ? "" : selectedPhone,
      
    },

    schema: isDelete
      ? matchSchema("phone", "رقم المالك", selectedPhone)
      : PhoneAcademySchema,

    submitButton: {
      text:
        mode === "add"
          ? "إضافة مالك"
          : mode === "update"
            ? "تعديل المالك"
            : "حذف المالك",

      loadingText:
        mode === "add"
          ? "جاري إضافة المالك..."
          : mode === "update"
            ? "جاري تعديل المالك..."
            : "جاري حذف المالك...",

      variant: isDelete ? "destructive" : undefined,
    },

    service: async (data) => {
      const owners = (() => {
        switch (mode) {
          case "add":
            return [...oldData.map((o) => o.phone), data.phone];

          case "update":
            return oldData.map((o) =>
              o.phone === item?.phone ? data.phone : o.phone,
            );

          case "delete":
            return oldData
              .filter((o) => o.phone !== item?.phone)
              .map((o) => o.phone);
        }
      })();

      return updateAcademy({ academyId, owners });
    },

    onSuccess: () => {
      toast.success(
        mode === "add"
          ? "تم إضافة المالك بنجاح"
          : mode === "update"
            ? "تم تعديل المالك بنجاح"
            : "تم حذف المالكم بنجاح",
      );

      queryClient.invalidateQueries({
        queryKey: ["academies"],
      });

      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
