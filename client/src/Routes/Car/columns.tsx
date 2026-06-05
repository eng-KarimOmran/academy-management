import type { Header } from "@/components/Table/HeaderTable";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Car } from "@/types/car";

export const columns: Header<Car>[] = [
  {
    key: "modelName",
    header: "موديل السيارة",
    display: (data) => data.modelName,
  },
  {
    key: "plateNumber",
    header: "رقم اللوحة",
    display: (data) => data.plateNumber,
  },
  {
    key: "gearType",
    header: "ناقل الحركة",
    display: (data) => (
      <span className="text-xs bg-muted p-1 rounded">
        {enumTranslations[data.gearType]}
      </span>
    ),
  },
  {
    key: "carSessionPrice",
    header: "سعر الحصة",
    display: (data) => `${data.carSessionPrice} جنيه`,
  },
  {
    key: "isActive",
    header: "الحالة",
    display: (data) => (data.isActive ? "نشط" : "غير نشط"),
  },
];
