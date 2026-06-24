import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { GetClientByPhoneDto } from "@/DTOs/client.dto";
import { getClientByPhone } from "@/service/client.service";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import type { Client } from "@/types/client";
import { GetClientByPhoneSchema } from "@/validations/client.validation";
import { useNavigate } from "react-router-dom";

export default function GetClientByPhoneForm() {
  const navigate = useNavigate();
  const { activeAcademy } = useActiveAcademyState();
  if (!activeAcademy) return null;
  const config: FormProps<GetClientByPhoneDto["params"], Client> = {
    inputs: [
      {
        name: "phone",
        type: "tel",
        placeholder: "ابحث برقم هاتف العميل",
      },
    ],

    defaultValues: {
      academyId: activeAcademy.id,
    },

    schema: GetClientByPhoneSchema.params,

    submitButton: {
      text: "ابحث",
      loadingText: "جاري البحث...",
    },

    service: (data) => getClientByPhone({ params: data }),

    onSuccess: (res) => {
      if ("data" in res) {
        navigate(
          `/dashboard/client/${res.data.id}?academyId=${activeAcademy.id}`,
        );
      }
    },
  };

  return <Form {...config} />;
}
