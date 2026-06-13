import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CreateSecretaryDto } from "@/DTOs/secretary.dto";
import { CreateSecretarySchema } from "@/validations/secretary.validation";

import { createSecretary } from "@/service/secretary.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import type { Secretary } from "@/types/secretary";
import { useDialogState } from "@/store/DialogState";

export default function AddSecretary({ phone }: { phone?: string }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CreateSecretaryDto, Secretary> = {
    inputs: [
      {
        name: "phone",
        type: "text",
        label: "رقم الهاتف",
        placeholder: "01xxxxxxxxx",
        disabled: !!phone,
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
      phone: phone ?? "",
      baseSalary: 0,
      targetCount: 0,
      bonusAmount: 0,
    },

    schema: CreateSecretarySchema,

    submitButton: {
      text: "إضافة سكرتير",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createSecretary(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secretaries"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم إضافة السكرتير بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
