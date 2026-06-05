import ShowMore from "@/components/ShowMore/ShowMore";
import type { Header } from "@/components/Table/HeaderTable";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Area } from "@/types/area";

export const columns: Header<Area>[] = [
  {
    key: "name",
    header: "اسم المنطقة",
    display: (data) => <ShowMore text={data.name} columns={4} />,
  },
  {
    key: "supportType",
    header: "نوع الدعم",
    display: (data) => (
      <span className="text-xs bg-muted p-1 rounded">
        {enumTranslations[data.supportType]}
      </span>
    ),
  },
  {
    key: "isActive",
    header: "الحالة",
    display: (data) => (data.isActive ? "نشط" : "غير نشط"),
  },
];
