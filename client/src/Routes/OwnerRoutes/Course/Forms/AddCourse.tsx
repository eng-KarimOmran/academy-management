import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CreateCourseDto } from "@/DTOs/course.dto";
import { CreateSchema } from "@/validations/course.validation";

import { createCourse } from "@/service/course.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import type { Course } from "@/types/course";
import { useDialogState } from "@/store/DialogState";

export default function AddCourse({ academyId }: { academyId: string }) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<CreateCourseDto, Course> = {
    inputs: [
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
        placeholder: "اكتب وصفاً مختصراً للكورس",
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
        label: "مدة الحصة (دقيقة)",
        col: "half",
      },

      {
        name: "featuredReason",
        type: "text",
        label: "سبب التميّز",
        placeholder: "لماذا يختار الطلاب هذا الكورس؟",
        col: "half",
      },
    ],

    defaultValues: {
      academyId,
      name: "",
      description: "",
      priceOriginal: 0,
      priceDiscounted: 0,
      totalSessions: 0,
      practicalSessions: 0,
      sessionDurationMinutes: 50,
      featuredReason: undefined,
    },

    schema: CreateSchema,

    submitButton: {
      text: "إضافة الكورس",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createCourse(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("تم إضافة الكورس بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
