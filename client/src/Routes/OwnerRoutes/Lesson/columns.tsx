import { BadgeDemo } from "@/components/CustomBadge/CustomBadge";
import type { Header } from "@/components/Table/HeaderTable";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import type { LessonBase } from "@/types/lesson";

export const columns: Header<LessonBase>[] = [
  {
    key: "captain",
    header: "المدرب",
    display: (data) => (
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{data.captain.user.name}</span>
        <span className="text-muted-foreground text-sm">
          {data.captain.user.phone}
        </span>
      </div>
    ),
  },
  {
    key: "client",
    header: "العميل",
    display: (data) => (
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{data.client.name}</span>
        <span className="text-muted-foreground text-sm">
          {data.client.phone}
        </span>
      </div>
    ),
  },
  {
    key: "car",
    header: "السيارة",
    display: (data) => (
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{data.car.modelName}</span>
        <span className="text-muted-foreground text-sm">
          {data.car.plateNumber}
        </span>
      </div>
    ),
  },
  {
    key: "area",
    header: "المنطقة",
    display: (data) => <span className="font-medium">{data.area.name}</span>,
  },
  {
    key: "startTime",
    header: "وقت البداية",
    display: (data) => (
      <div className="flex flex-col gap-1 text-sm">
        <span className="font-medium">
          {formatDate(data.startTime, "time")}
        </span>
        <span className="text-muted-foreground">
          {formatDate(data.startTime, "date")}
        </span>
      </div>
    ),
  },
  {
    key: "endTime",
    header: "وقت النهاية",
    display: (data) => (
      <div className="flex flex-col gap-1 text-sm">
        <span className="font-medium"> {formatDate(data.endTime, "time")}</span>
        <span className="text-muted-foreground">
          {formatDate(data.endTime, "date")}
        </span>
      </div>
    ),
  },
  {
    key: "transmission",
    header: "الناقل",
    display: (data) => (
      <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium">
        {enumTranslations[data.transmission]}
      </span>
    ),
  },
  {
    key: "status",
    header: "الحالة",
    display: (data) => (
      <BadgeDemo type={data.status} text={enumTranslations[data.status]} />
    ),
  },
];
