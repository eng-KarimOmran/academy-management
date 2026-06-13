import Form, { type FormProps } from "@/components/Form/Form";
import { matchSchema } from "@/lib/matchSchema";
import { queryClient } from "@/lib/queryClient";
import { deleteOwner } from "@/service/academy.service";
import { useDialogState } from "@/store/DialogState";
import type { Academy } from "@/types/academy";
import { toast } from "sonner";

export default function DeleteOwner({
  phone,
  academyId,
  ownerId,
}: {
  phone: string;
  academyId: string;
  ownerId: string;
}) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<{ phone: string }, Academy> = {
    inputs: [
      {
        name: "phone",
        type: "tel",
        label: `اكتب ( ${phone} ) لتأكيد الحذف`,
        placeholder: `اكتب ${phone}`,
      },
    ],

    defaultValues: {
      phone: "",
    },

    schema: matchSchema("phone", "رقم المالك", phone),

    submitButton: {
      text: "حذف",
      loadingText: "جاري حذف الأكاديمية...",
      variant: "destructive",
    },

    service: async () => deleteOwner({ academyId, ownerId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      toast.success("تم حذف الأكاديمية بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}