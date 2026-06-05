import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Client } from "@/types/client";
import type { UpdateClientDto } from "@/DTOs/client.dto";

import { updateClient } from "@/service/client.service";
import { UpdateClientSchema } from "@/validations/client.validation";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { useDialogState } from "@/store/DialogState";

export default function UpdateClient({ item }: { item: Client }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<UpdateClientDto, Client> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: "الاسم",
      },
      {
        name: "phone",
        type: "text",
        label: "رقم الهاتف",
      },
    ],

    defaultValues: {
      academyId: item.academyId,
      id: item.id,
      name: item.name,
      phone: item.phone,
    },

    schema: UpdateClientSchema,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateClient(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients", item.academyId],
      });
      toast.success("تم تعديل العميل بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
