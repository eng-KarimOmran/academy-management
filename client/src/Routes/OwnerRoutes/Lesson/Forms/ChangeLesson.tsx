import Form from "@/components/Form/Form";
import type { FormProps } from "@/components/Form/Form";
import type { ChangeLessonStateDto } from "@/DTOs/lesson.dto";
import { changeLessonState } from "@/service/lesson.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import type { LessonBase } from "@/types/lesson";
import { LessonStatus } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import { ChangeLessonStateSchema } from "@/validations/lesson.validation";
import { useDialogState } from "@/store/DialogState";

export default function ChangeLesson({ item }: { item: LessonBase }) {
  const { setConfigDialog } = useDialogState();

  const params: ChangeLessonStateDto["params"] = {
    academyId: item.academy.id,
    lessonId: item.id,
  };

  const config: FormProps<ChangeLessonStateDto["body"], LessonBase> = {
    inputs: [
      {
        name: "status",
        type: "select",
        label: "حالة الحصة",
        placeholder: "اختر حالة الحصة",
        options: LessonStatus.map((t) => ({
          label: enumTranslations[t] || t,
          value: t,
        })),
        col: "half",
      },
    ],

    schema: ChangeLessonStateSchema.body,

    submitButton: {
      text: "تغير حالة الحصة",
      loadingText: "جاري التغير...",
    },

    service: (data) => changeLessonState({ body: data, params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({
        queryKey: ["subscriptions", item.academy.id],
      });
      toast.success("تم تعديل الحصة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
