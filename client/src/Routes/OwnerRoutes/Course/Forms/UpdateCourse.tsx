import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Course } from "@/types/course";
import type { UpdateCourseDto } from "@/DTOs/course.dto";

import { updateCourse } from "@/service/course.service";
import { UpdateSchema } from "@/validations/course.validation";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { useDialogState } from "@/store/DialogState";

export default function UpdateCourse({ item }: { item: Course }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<UpdateCourseDto, Course> = {
    inputs: [
      {
        name: "isActive",
        type: "switch",
        label: "حالة النشاط",
      },

      {
        name: "name",
        type: "text",
        label: "اسم الكورس",
        placeholder: "أدخل اسم الكورس",
      },

      {
        name: "description",
        type: "textarea",
        label: "الوصف",
        placeholder: "وصف مختصر للكورس",
      },

      {
        name: "priceOriginal",
        type: "number",
        label: "السعر الأصلي",
        col: "half",
      },

      {
        name: "priceDiscounted",
        type: "number",
        label: "السعر بعد الخصم",
        col: "half",
      },

      {
        name: "totalSessions",
        type: "number",
        label: "إجمالي الحصص",
        col: "half",
      },

      {
        name: "practicalSessions",
        type: "number",
        label: "الحصص العملية",
        col: "half",
      },

      {
        name: "sessionDurationMinutes",
        type: "number",
        label: "المدة (دقيقة)",
        col: "half",
      },

      {
        name: "featuredReason",
        type: "text",
        label: "لماذا هذا الكورس مميز؟",
        placeholder: "مثال: مدربين دوليين",
        col: "half",
      },
    ],

    defaultValues: {
      courseId: item.id,
      academyId: item.academyId,
      name: item.name,
      description: item.description,
      priceOriginal: item.priceOriginal,
      priceDiscounted: item.priceDiscounted,
      totalSessions: item.totalSessions,
      practicalSessions: item.practicalSessions,
      sessionDurationMinutes: item.sessionDurationMinutes,
      isActive: item.isActive,
      featuredReason: item.featuredReason ?? undefined,
    },

    schema: UpdateSchema,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateCourse(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("تم تعديل الكورس بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
