import Form from "@/components/Form/Form";
import type { FormProps } from "@/components/Form/Form";
import type { SocialMediaSchemaDto } from "@/DTOs/academy.dto";
import type { Academy, SocialMediaLink } from "@/types/academy";
import { Platform } from "@/types/enums";
import { socialMediaSchema } from "@/validations/academy.validation";
import { matchSchema } from "@/lib/matchSchema";
import { queryClient } from "@/lib/queryClient";
import { updateAcademy } from "@/service/academy.service";
import { useDialogState } from "@/store/DialogState";
import { enumTranslations } from "@/lib/enumTranslations";
import { toast } from "sonner";

type Mode = "add" | "update" | "delete";

type Props = {
  academyId: string;
  oldData: SocialMediaLink[];
  item?: SocialMediaLink;
  mode: Mode;
};

export default function SocialMediaForm({
  academyId,
  oldData,
  item,
  mode,
}: Props) {
  const { setConfigDialog } = useDialogState();
  const isDelete = mode === "delete";

  const config: FormProps<SocialMediaSchemaDto, Academy> = {
    inputs: isDelete
      ? [
          {
            name: "url",
            label: 'اكتب "تأكيد" للموافقة على حذف هذه المنصة',
            type: "text",
            placeholder: 'اكتب كلمة "تأكيد"',
          },
        ]
      : [
          {
            name: "platform",
            type: "select",
            label: "اسم المنصة",
            placeholder: "اختر المنصة",
            options: Object.values(Platform).map((p) => ({
              label: enumTranslations[p] || p,
              value: p,
            })),
          },
          {
            name: "url",
            type: "url",
            label: "الرابط",
            placeholder: "https://example.com",
          },
        ],

    defaultValues: {
      platform: item?.platform,
      url: isDelete ? "" : item?.url,
    },

    schema: isDelete
      ? matchSchema("url", "كلمة التأكيد", "تأكيد")
      : socialMediaSchema,

    submitButton: {
      text:
        mode === "add"
          ? "إضافة وسيلة تواصل"
          : mode === "update"
            ? "تعديل وسيلة التواصل"
            : "حذف وسيلة التواصل",

      loadingText:
        mode === "add"
          ? "جاري الإضافة..."
          : mode === "update"
            ? "جاري التعديل..."
            : "جاري الحذف...",

      variant: isDelete ? "destructive" : undefined,
    },

    service: async (data) => {
      const updated = (() => {
        switch (mode) {
          case "add":
            return [...oldData, data as SocialMediaLink];

          case "update":
            return oldData.map((s) =>
              s.id === item?.id ? { ...s, ...data } : s,
            );

          case "delete":
            return oldData.filter((s) => s.id !== item?.id);
        }
      })();

      return updateAcademy({
        academyId,
        socialMediaPlatforms: updated,
      });
    },

    onSuccess: () => {
      toast.success(
        mode === "add"
          ? "تم إضافة وسيلة التواصل بنجاح"
          : mode === "update"
            ? "تم تعديل وسيلة التواصل بنجاح"
            : "تم حذف وسيلة التواصل بنجاح",
      );

      queryClient.invalidateQueries({
        queryKey: ["academies"],
      });

      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
