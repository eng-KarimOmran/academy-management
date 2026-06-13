import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Course } from "@/types/course";
import { deleteCourse } from "@/service/course.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";

export default function DeleteCourse({
  item,
  academyId,
}: {
  item: Course;
  academyId: string;
}) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<{ name: string }, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "${item.name}" لتأكيد الحذف`,
        placeholder: "اكتب اسم الكورس",
      },
    ],

    defaultValues: {
      name: "",
    },

    schema: matchSchema("name", "الكورس", item.name),

    submitButton: {
      text: "حذف الكورس",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () =>
      deleteCourse({
        academyId,
        courseId: item.id,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      toast.success("تم حذف الكورس بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
