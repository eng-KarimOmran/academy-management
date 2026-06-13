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

  const config: FormProps<ChangeLessonStateDto, LessonBase> = {
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
      lessonId: lesson.id,
      academyId: lesson.academy.id,
      status: "COMPLETED",
      paymentMethod: "CASH",
      amount: lesson.expectedAmount,
    },

    schema: ChangeLessonStateSchema,

    submitButton: {
      text: "اكملت الحصة",
      loadingText: "جاري تحديث حالة الحصة",
    },

    service: (data) => changeLessonState(data),

    onSuccess: () => {
      toast.success("تم اكمال الحصة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
