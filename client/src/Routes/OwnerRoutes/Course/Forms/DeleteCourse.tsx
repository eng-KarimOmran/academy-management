import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Course } from "@/types/course";
import { deleteCourse } from "@/service/course.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";
import type { DeleteDto } from "@/DTOs/course.dto";

export default function DeleteCourse({
  item,
  academyId,
}: {
  item: Course;
  academyId: string;
}) {
  const { setConfigDialog } = useDialogState();
  const params: DeleteDto["params"] = { courseId: item.id, academyId };

  const config: FormProps<{ name: string }, null> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: `اكتب "${item.name}" لتأكيد الحذف`,
        placeholder: "اكتب اسم الكورس",
      },
    ],

    schema: matchSchema("name", "الكورس", item.name),

    submitButton: {
      text: "حذف الكورس",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () => deleteCourse({ params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      toast.success("تم حذف الكورس بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
