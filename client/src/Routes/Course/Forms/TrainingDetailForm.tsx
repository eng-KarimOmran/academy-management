import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { updateCourse } from "@/service/course.service";
import type { FormProps } from "@/components/Form/Form";
import type { Course } from "@/types/course";
import { z } from "zod";
import { matchSchema } from "@/lib/matchSchema";
import Form from "@/components/Form/Form";
import { useDialogState } from "@/store/DialogState";

type Mode = "add" | "update" | "delete";

type TrainingDetailCtx = {
  courseId: string;
  academyId: string;
  oldData: string[];
  item?: string;
  itemIndex?: number;
  mode: Mode;
};

const TrainingDetailSchema = z.object({
  detail: z.string().min(3, "يجب أن يحتوي النص على 3 أحرف على الأقل"),
});

type TrainingDetailDto = z.infer<typeof TrainingDetailSchema>;

export default function TrainingDetailForm({
  courseId,
  oldData,
  item,
  itemIndex,
  mode,
  academyId,
}: TrainingDetailCtx) {
  const { setConfigDialog } = useDialogState();
  const selectedDetail = item ?? "";

  const isDelete = mode === "delete";

  const config: FormProps<TrainingDetailDto, Course> = {
    inputs: [
      {
        name: "detail",
        type: "text",
        label: isDelete
          ? 'اكتب كلمة "تأكيد" لحذف هذا العنصر من البرنامج'
          : "تفاصيل البرنامج التدريبي",
        placeholder: isDelete
          ? "تأكيد"
          : "مثال: التدريب العملي على المنحنيات والمنعطفات...",
      },
    ],

    defaultValues: {
      detail: isDelete ? "" : selectedDetail,
    },

    schema: isDelete
      ? matchSchema("detail", "كلمة التأكيد", "تأكيد")
      : TrainingDetailSchema,

    submitButton: {
      text:
        mode === "add"
          ? "إضافة تفاصيل"
          : mode === "update"
            ? "تعديل التفاصيل"
            : "حذف التفاصيل",

      loadingText:
        mode === "add"
          ? "جاري الإضافة..."
          : mode === "update"
            ? "جاري التعديل..."
            : "جاري الحذف...",

      variant: isDelete ? "destructive" : undefined,
    },

    service: async (data) => {
      const newDetails = (() => {
        switch (mode) {
          case "add":
            return [...oldData, data.detail];
          case "update":
            if (itemIndex !== undefined) {
              const arr = [...oldData];
              arr[itemIndex] = data.detail;
              return arr;
            }
            return oldData.map((d) => (d === item ? data.detail : d));
          case "delete":
            if (itemIndex !== undefined) {
              return oldData.filter((_, i) => i !== itemIndex);
            }
            return oldData.filter((d) => d !== item);
        }
      })();

      return updateCourse({
        id: courseId,
        academyId,
        trainingDetails: newDetails,
      });
    },

    onSuccess: () => {
      toast.success(
        mode === "add"
          ? "تمت الإضافة إلى البرنامج بنجاح"
          : mode === "update"
            ? "تم تعديل تفاصيل البرنامج بنجاح"
            : "تم الحذف من البرنامج بنجاح",
      );

      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
