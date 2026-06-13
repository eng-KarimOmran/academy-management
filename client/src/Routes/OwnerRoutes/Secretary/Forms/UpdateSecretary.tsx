import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Secretary } from "@/types/secretary";
import type { UpdateSecretaryDto } from "@/DTOs/secretary.dto";

import { updateSecretary } from "@/service/secretary.service";
import { UpdateSecretarySchema } from "@/validations/secretary.validation";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { useDialogState } from "@/store/DialogState";

export default function UpdateSecretary({
  item,
}: {
  item: Pick<Secretary, "id" | "baseSalary" | "bonusAmount" | "targetCount">;
}) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<UpdateSecretaryDto, Secretary> = {
    inputs: [
      {
        name: "baseSalary",
        type: "number",
        label: "المرتب الأساسي",
        col: "full",
      },

      {
        name: "targetCount",
        type: "number",
        label: "التارجت",
        col: "full",
      },

      {
        name: "bonusAmount",
        type: "number",
        label: "البونص",
        col: "full",
      },
    ],

    defaultValues: {
      secretaryId: item.id,
      baseSalary: item.baseSalary,
      targetCount: item.targetCount,
      bonusAmount: item.bonusAmount,
    },

    schema: UpdateSecretarySchema,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateSecretary(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secretaries"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم تعديل السكرتير بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
