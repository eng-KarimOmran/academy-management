import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { deleteUser } from "@/service/user.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import { matchSchema } from "@/lib/matchSchema";

import type { User } from "@/types/user";
import { useDialogState } from "@/store/DialogState";

export default function DeleteUser({ item }: { item: User }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<{ name: string }, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "${item.name}" لتأكيد الحذف`,
        placeholder: "اكتب الاسم للتأكيد",
      },
    ],

    defaultValues: {
      name: "",
    },

    schema: matchSchema("name", item.name, "اسم المستخدم"),

    submitButton: {
      text: "حذف المستخدم",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () => {
      return deleteUser({ userId: item.id });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم حذف المستخدم بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
