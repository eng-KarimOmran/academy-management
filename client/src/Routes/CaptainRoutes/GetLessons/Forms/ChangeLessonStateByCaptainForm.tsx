import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { ChangeLessonStateDto } from "@/DTOs/lesson.dto";
import { queryClient } from "@/lib/queryClient";
import { changeLessonState } from "@/service/lesson.service";
import { useDialogState } from "@/store/DialogState";
import type { LessonBase } from "@/types/lesson";
import { ChangeLessonStateSchema } from "@/validations/lesson.validation";
import { toast } from "sonner";

export default function ChangeLessonStateByCaptainForm({
  lesson,
}: {
  lesson: LessonBase;
}) {
  const { setConfigDialog } = useDialogState();
  const params: ChangeLessonStateDto["params"] = {
    lessonId: lesson.id,
    academyId: lesson.academy.id,
  };

  const config: FormProps<ChangeLessonStateDto["body"], LessonBase> = {
    inputs: lesson.expectedAmount
      ? [
          {
            name: "amount",
            type: "number",
            label: "ادخل المبلغ المحصل من العميل",
            placeholder: `مطلوب تحصيل ${lesson.expectedAmount}`,
          },
        ]
      : [],

    defaultValues: {
      amount: lesson.expectedAmount,
      status: "COMPLETED",
    },

    schema: ChangeLessonStateSchema.body,

    submitButton: {
      text: "اكملت الحصة",
      loadingText: "جاري تحديث حالة الحصة",
    },

    service: (data) => changeLessonState({ body: data, params }),

    onSuccess: () => {
      toast.success("تم اكمال الحصة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}