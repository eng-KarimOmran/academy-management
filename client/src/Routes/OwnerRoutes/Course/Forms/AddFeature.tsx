import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { useDialogState } from "@/store/DialogState";
import type { AddCourseFeaturesDto } from "@/DTOs/course.dto";
import type { Course } from "@/types/course";
import { AddCourseFeaturesSchema } from "@/validations/course.validation";
import { AddCourseFeatures } from "@/service/course.service";

export default function AddFeature({
  academyId,
  courseId,
}: {
  academyId: string;
  courseId: string;
}) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<AddCourseFeaturesDto, Course> = {
    inputs: [
      {
        name: "text",
        type: "text",
        label: "الميزة",
        placeholder: "اكتب الميزة",
      },
    ],

    defaultValues: {
      academyId,
      courseId,
      text: "",
    },

    schema: AddCourseFeaturesSchema,

    submitButton: {
      text: "إضافة الميزة",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => AddCourseFeatures(data),

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