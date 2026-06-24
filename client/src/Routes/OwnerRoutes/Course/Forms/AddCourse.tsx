import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import { CreateSchema } from "@/validations/course.validation";

import { createCourse } from "@/service/course.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import type { Course } from "@/types/course";
import { useDialogState } from "@/store/DialogState";
import type { CreateDto } from "@/DTOs/course.dto";

export default function AddCourse({ academyId }: { academyId: string }) {
  const { setConfigDialog } = useDialogState();
  const params: CreateDto["params"] = { academyId };

  const config: FormProps<CreateDto["body"], Course> = {
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

    schema: CreateSchema.body,

    defaultValues: {
      requiredInitialDeposit: 50,
      sessionDurationMinutes: 50,
    },

    submitButton: {
      text: "إضافة الكورس",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createCourse({ body: data, params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("تم إضافة الكورس بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
