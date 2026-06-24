import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Client } from "@/types/client";
import { deleteClient } from "@/service/client.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";
import type { DeleteClientDto } from "@/DTOs/client.dto";

export default function DeleteClient({ item }: { item: Client }) {
  const { setConfigDialog } = useDialogState();
  
  const params: DeleteClientDto["params"] = {
    academyId: item.academyId,
    clientId: item.id,
  };

  const config: FormProps<{ name: string }, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "${item.name}" لتأكيد الحذف`,
        placeholder: "اكتب اسم العميل لتأكيد الحذف",
      },
    ],

    schema: matchSchema("name", "العميل", item.name),

    submitButton: {
      text: "حذف العميل",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () => deleteClient({ params }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients", item.academyId],
      });

      toast.success("تم حذف العميل بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
