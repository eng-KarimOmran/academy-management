import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { deleteUser } from "@/service/user.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { matchSchema } from "@/lib/matchSchema";

import type { User } from "@/types/user";
import { useDialogState } from "@/store/DialogState";
import type { DeleteUserDto } from "@/DTOs/user.dto";

export default function DeleteUser({ item }: { item: User }) {
  const { setConfigDialog } = useDialogState();

  const params: DeleteUserDto["params"] = { userId: item.id };

  const config: FormProps<{ name: string }, User> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "${item.name}" لتأكيد الحذف`,
        placeholder: "اكتب الاسم للتأكيد",
      },
    ],

    schema: matchSchema("name", "اسم المستخدم", item.name),

    submitButton: {
      text: "حذف المستخدم",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: () => deleteUser({ params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم حذف المستخدم بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
