import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { Area } from "@/types/area";
import { deleteArea } from "@/service/area.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";
import type { DeleteDto } from "@/DTOs/area.dto";

export default function DeleteArea({ item }: { item: Area }) {
  const { setConfigDialog } = useDialogState();
  const params: DeleteDto["params"] = { areaId: item.id };

  const config: FormProps<{ name: string }, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "${item.name}" لتأكيد الحذف`,
        placeholder: "اكتب اسم المنطقة للتأكيد",
      },
    ],

    schema: matchSchema("name", "اسم المنطقة", item.name),

    submitButton: {
      text: "حذف المنطقة",
      loadingText: "جاري حذف المنطقة...",
      variant: "destructive",
    },

    service: async () => deleteArea({ params }),

    onSuccess: () => {
      toast.success("تم حذف المنطقة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
