import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import { useDialogState } from "@/store/DialogState";
import { AnalyticsSchema } from "@/validations/statistics.validation";
import dayjs from "dayjs";

export interface DateFormProps {
  startDate: string;
  endDate: string;
}

interface Props {
  date: DateFormProps | null;
  setDate: (data: DateFormProps) => void;
}

export default function DateForm({ setDate, date }: Props) {
  const { setConfigDialog } = useDialogState();

  const config: FormProps<{ startDate: string; endDate: string }, null> = {
    inputs: [
      {
        name: "startDate",
        type: "date",
        label: "من",
        placeholder: "ادخل تاريخ البداية",
        col: "half",
      },
      {
        name: "endDate",
        type: "date",
        label: "الى",
        placeholder: "ادخل تاريخ الانتهاء",
        col: "half",
      },
    ],
    defaultValues: {
      startDate: date ? date.startDate : "",
      endDate: date ? date.endDate : "",
    },
    schema: AnalyticsSchema,
    onSuccess: (data) => {
      if (!("data" in data)) {
        const startDate = dayjs(data.startDate).toISOString();
        const endDate = dayjs(data.endDate).toISOString();
        setDate({ startDate, endDate });
        setConfigDialog(null);
      }
    },
    submitButton: { text: "تعين الفلتر" },
  };

  return <Form {...config} />;
}
