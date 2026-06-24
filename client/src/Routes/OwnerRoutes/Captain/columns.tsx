import type { Header } from "@/components/Table/HeaderTable";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Captain } from "@/types/captain";

export const columns: Header<Captain>[] = [
  {
    key: "user",
    header: "الاسم",
    display: (data) => data.user.name,
  },
  {
    key: "user",
    header: "الهاتف",
    display: (data) => data.user.phone,
  },
  {
    key: "supportType",
    header: "نوع التدريب",
    display: (data) => (
      <span className="text-xs bg-muted p-1 rounded">
        {enumTranslations[data.supportType]}
      </span>
    ),
  },
  {
    key: "captainLessonPrice",
    header: "سعر الحصة",
    display: (data) => data.captainLessonPrice,
  },
  {
    key: "isActive",
    header: "الحالة",
    display: (data) => (data.isActive ? "نشط" : "غير نشط"),
  },
];
