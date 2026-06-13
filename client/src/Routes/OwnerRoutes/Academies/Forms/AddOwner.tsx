import Form, { type FormProps } from "@/components/Form/Form";
import type { AddAcademyOwnerDto } from "@/DTOs/academy.dto";
import { queryClient } from "@/lib/queryClient";
import { addOwner } from "@/service/academy.service";
import { useDialogState } from "@/store/DialogState";
import type { Academy } from "@/types/academy";
import { AddOwnerSchema } from "@/validations/academy.validation";
import { toast } from "sonner";

export default function AddOwner({ academyId }: { academyId: string }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<AddAcademyOwnerDto, Academy> = {
    defaultValues: {
      phone: "",
      academyId,
    },
    inputs: [
      {
        name: "phone",
        type: "tel",
        label: "رقم المالك",
        placeholder: "اكتب رقم المالك",
      },
    ],
    submitButton: {
      loadingText: "جاري اضافة مالك للأكادمية",
      text: "اضافة المالك",
    },
    schema: AddOwnerSchema,
    service: (data) => addOwner(data),
    onSuccess: () => {
      toast.success("تم اضافة المالك بنجاح");
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      setConfigDialog(null);
    },
  };
  return <Form {...config} />;
}
