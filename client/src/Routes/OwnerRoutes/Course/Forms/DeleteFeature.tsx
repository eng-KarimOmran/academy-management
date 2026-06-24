import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";

import type { Course, CourseFeatures } from "@/types/course";
import type { DeleteFeaturesDto } from "@/DTOs/course.dto";
import { deleteCourseFeatures } from "@/service/course.service";

export default function DeleteFeature({
  item,
  academyId,
  courseId,
}: {
  item: CourseFeatures;
  academyId: string;
  courseId: string;
}) {
  const { setConfigDialog } = useDialogState();

  const params: DeleteFeaturesDto["params"] = {
    courseId,
    academyId,
    featureId: item.id,
  };

  const config: FormProps<{ text: string }, Course> = {
    inputs: [
      {
        name: "text",
        type: "text",
        label: `اكتب "${item.text}" لتأكيد الحذف`,
        placeholder: "اكتب نص الميزة",
      },
    ],

    schema: matchSchema("text", "الميزة", item.text),

    submitButton: {
      text: "حذف الميزة",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () => deleteCourseFeatures({ params }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      toast.success("تم حذف الميزة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
