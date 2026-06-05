import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { updateUser } from "@/service/user.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { UpdateUserSchema } from "@/validations/user.validation";

import type { User } from "@/types/user";
import type { UpdateUserDto } from "@/DTOs/user.dto";
import { useDialogState } from "@/store/DialogState";
import { UserStatus } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";

export default function UpdateUser({ item }: { item: User }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<UpdateUserDto, User> = {
    inputs: [
      {
        name: "status",
        type: "select",
        label: "الحالة",
        options: UserStatus.map((s) => ({
          label: enumTranslations[s],
          value: s,
        })),
      },
      {
        name: "name",
        type: "text",
        label: "الاسم",
        placeholder: "اسم المستخدم",
        col: "half",
      },
      {
        name: "phone",
        type: "text",
        label: "رقم الهاتف",
        placeholder: "01xxxxxxxxx",
        col: "half",
      },
    ],

    defaultValues: {
      userId: item.id,
      name: item.name,
      phone: item.phone,
      status: item.status,
    },

    schema: UpdateUserSchema,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم تعديل بيانات المستخدم بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
