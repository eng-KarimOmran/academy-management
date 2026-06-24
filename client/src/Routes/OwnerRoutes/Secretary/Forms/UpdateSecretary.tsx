import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Secretary } from "@/types/secretary";

import { updateSecretary } from "@/service/secretary.service";
import { UpdateSecretarySchema } from "@/validations/secretary.validation";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { useDialogState } from "@/store/DialogState";
import type { UpdateDto } from "@/DTOs/secretary.dto";

export default function UpdateSecretary({
  item,
}: {
  item: Pick<
    Secretary,
    "academyId" | "baseSalary" | "bonusAmount" | "id" | "targetCount"
  >;
}) {
  const { setConfigDialog } = useDialogState();

  const params: UpdateDto["params"] = {
    academyId: item.academyId,
    secretaryId: item.id,
  };

  const config: FormProps<UpdateDto["body"], Secretary> = {
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
      baseSalary: item.baseSalary,
      targetCount: item.targetCount,
      bonusAmount: item.bonusAmount,
    },

    schema: UpdateSecretarySchema.body,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateSecretary({ body: data, params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secretaries"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم تعديل السكرتير بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
