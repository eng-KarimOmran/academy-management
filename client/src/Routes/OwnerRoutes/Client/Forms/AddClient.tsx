import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CreateClientDto } from "@/DTOs/client.dto";
import { CreateClientSchema } from "@/validations/client.validation";

import { createClient } from "@/service/client.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { ClientSource } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Client } from "@/types/client";
import { useNavigate } from "react-router-dom";
import { useDialogState } from "@/store/DialogState";

export default function AddClient({ academyId }: { academyId: string }) {
  const navigate = useNavigate();
  const { setConfigDialog } = useDialogState();
  const config: FormProps<CreateClientDto, Client> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: "الاسم",
        placeholder: "اسم العميل",
      },
      {
        name: "phone",
        type: "text",
        label: "رقم الهاتف",
        placeholder: "01xxxxxxxxx",
      },
      {
        name: "clientSource",
        type: "select",
        label: "مصدر العميل",
        placeholder: "اختر المصدر",
        options: ClientSource.map((s) => ({
          label: enumTranslations[s],
          value: s,
        })),
      },
    ],

    defaultValues: {
      academyId,
      name: "",
      phone: "",
      clientSource: "OFFICE",
    },

    schema: CreateClientSchema,

    submitButton: {
      text: "إضافة عميل",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createClient(data),

    onSuccess: (res) => {
      if (academyId) {
        queryClient.invalidateQueries({
          queryKey: ["clients", academyId],
        });
      }
      toast.success("تم إضافة العميل بنجاح");
      setConfigDialog(null);
      if ("data" in res) {
        navigate(
          `/dashboard/client/${res.data.id}?academyId=${res.data.academyId}`,
        );
      }
    },
  };

  return <Form {...config} />;
}
