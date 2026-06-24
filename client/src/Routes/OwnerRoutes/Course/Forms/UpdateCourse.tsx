import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Course } from "@/types/course";

import { updateCourse } from "@/service/course.service";
import { UpdateSchema } from "@/validations/course.validation";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { useDialogState } from "@/store/DialogState";
import type { UpdateDto } from "@/DTOs/course.dto";

export default function UpdateCourse({ item }: { item: Course }) {
  const { setConfigDialog } = useDialogState();

  const params: UpdateDto["params"] = {
    courseId: item.id,
    academyId: item.academyId,
  };

  const config: FormProps<UpdateDto["body"], Course> = {
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
        name: "requiredInitialDeposit",
        type: "number",
        label: "الحد الأدنى للديبوزت",
        col: "half",
      },
      {
        name: "sessionsBeforeFullPayment",
        type: "number",
        label: "عدد الحصص قبل سداد كامل المبلغ.",
        placeholder: "عدد الحصص المسموح بيها قبل سدادا كامل المبلغ",
        col: "half",
      },
      {
        name: "totalSessions",
        type: "number",
        label: "إجمالي الحصص",
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
      name: item.name,
      description: item.description,
      priceOriginal: item.priceOriginal,
      priceDiscounted: item.priceDiscounted,
      totalSessions: item.totalSessions,
      sessionDurationMinutes: item.sessionDurationMinutes,
      isActive: item.isActive,
      featuredReason: item.featuredReason ?? "",
      requiredInitialDeposit: item.requiredInitialDeposit,
      sessionsBeforeFullPayment: item.sessionsBeforeFullPayment,
    },

    schema: UpdateSchema.body,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateCourse({ body: data, params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("تم تعديل الكورس بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
