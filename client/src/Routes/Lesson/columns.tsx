import type { Header } from "@/components/Table/HeaderTable";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import type { LessonBase } from "@/types/lesson";

export const columns: Header<LessonBase>[] = [
  {
    key: "captain",
    header: "المدرب",
    display: (data) => (
      <div className="flex flex-col">
        <span className="font-medium">{data.captain.user.name}</span>
        <span className="font-medium">{data.captain.user.phone}</span>
      </div>
    ),
  },
  {
    key: "client",
    header: "العميل",
    display: (data) => (
      <div className="flex flex-col">
        <span className="font-medium">{data.client.name}</span>
        <span className="font-medium">{data.client.phone}</span>
      </div>
    ),
  },
  {
    key: "car",
    header: "السيارة",
    display: (data) => (
      <div className="flex flex-col">
        <span className="font-medium">{data.car.modelName}</span>
        <span className="font-medium">{data.car.plateNumber}</span>
      </div>
    ),
  },
  {
    key: "area",
    header: "المنطقة",
    display: (data) => <span>{data.area.name}</span>,
  },
  {
    key: "startTime",
    header: "وقت الحصة",
    display: (data) => (
      <span dir="ltr" className="text-sm">
        {formatDate(data.startTime)}
      </span>
    ),
  },
  {
    key: "transmission",
    header: "الناقل",
    display: (data) => (
      <span className="text-xs bg-muted p-1 rounded">
        {enumTranslations[data.transmission]}
      </span>
    ),
  },
  {
    key: "expectedAmount",
    header: "المبلغ المتوقع",
    display: (data) => (
      <span className="text-xs bg-muted px-2 py-1 rounded font-bold">
        {data.expectedAmount} جنيه
      </span>
    ),
  },
  {
    key: "status",
    header: "الحالة",
    display: (data) => {
      return (
        <span className="text-xs px-2 py-1 rounded">
          {enumTranslations[data.status]}
        </span>
      );
    },
  },
];
