import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { useDialogState } from "@/store/DialogState";
import type { Course } from "@/types/course";
import { AddCourseFeaturesSchema } from "@/validations/course.validation";
import type { AddFeaturesDto } from "@/DTOs/course.dto";
import { addCourseFeatures } from "@/service/course.service";

export default function AddFeature({
  academyId,
  courseId,
}: {
  academyId: string;
  courseId: string;
}) {
  const { setConfigDialog } = useDialogState();
  const params: AddFeaturesDto["params"] = { academyId, courseId };

  const config: FormProps<AddFeaturesDto["body"], Course> = {
    inputs: [
      {
        name: "text",
        type: "text",
        label: "الميزة",
        placeholder: "اكتب الميزة",
      },
    ],

    schema: AddCourseFeaturesSchema.body,

    submitButton: {
      text: "إضافة الميزة",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => addCourseFeatures({ body: data, params }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      toast.success("تم إضافة الميزة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
