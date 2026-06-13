import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";

import { DeleteCourseFeatures } from "@/service/course.service";
import type { Course, CourseFeatures } from "@/types/course";

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

  const config: FormProps<{ text: string }, Course> = {
    inputs: [
      {
        name: "text",
        type: "text",
        label: `اكتب "${item.text}" لتأكيد الحذف`,
        placeholder: "اكتب نص الميزة",
      },
    ],

    defaultValues: {
      text: "",
    },

    schema: matchSchema("text", "الميزة", item.text),

    submitButton: {
      text: "حذف الميزة",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () =>
      DeleteCourseFeatures({ academyId, courseId, featureId: item.id }),

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
