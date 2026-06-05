import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import { deleteAcademy } from "@/service/academy.service";
import type { Academy } from "@/types/academy";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";

interface DeleteDto {
  name: string;
}

export default function DeleteAcademy({ item }: { item: Academy }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<DeleteDto, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب اسم الأكاديمية ( ${item.name} ) لتأكيد الحذف`,
        placeholder: `اكتب ${item.name}`,
      },
    ],

    defaultValues: {
      name: "",
    },

    schema: matchSchema("name", "اسم الأكاديمية", item.name),

    submitButton: {
      text: "حذف",
      loadingText: "جاري حذف الأكاديمية...",
      variant: "destructive",
    },

    service: async () => deleteAcademy({ academyId: item.id }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      toast.success("تم حذف الأكاديمية بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
