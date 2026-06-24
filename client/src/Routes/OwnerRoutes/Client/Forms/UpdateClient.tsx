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

  const params: UpdateClientDto["params"] = {
    academyId: item.academyId,
    clientId: item.id,
  };

  const config: FormProps<UpdateClientDto["body"], Client> = {
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
      name: item.name,
      phone: item.phone,
      clientSource: item.clientSource,
    },

    schema: UpdateClientSchema.body,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => {
      console.log(data);
      return updateClient({ body: data, params });
    },

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
