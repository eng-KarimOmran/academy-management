import ShowMore from "@/components/ShowMore/ShowMore";
import type { Header } from "@/components/Table/HeaderTable";
import { Badge } from "@/components/ui/badge";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import type { SubscriptionBase } from "@/types/subscription";
import { StatusBadge } from "../Transaction/components/StatusBadge";

export const columns: Header<SubscriptionBase>[] = [
  {
    key: "id",
    header: "معرف الاشتراك",
    display: (data) => <ShowMore columns={8} text={data.id.toUpperCase()} />,
  },

  {
    key: "client",
    header: "العميل",
    display: (data) => (
      <div className="flex flex-col">
        <span className="font-semibold text-[14px]">{data.client.name}</span>
        <span className="text-xs text-muted-foreground font-mono" dir="ltr">
          {data.client.phone}
        </span>
      </div>
    ),
  },

  {
    key: "course",
    header: "الكورس",
    display: (data) => (
      <span className="font-medium text-primary">{data.course.name}</span>
    ),
  },

  {
    key: "sessionDurationMinutes",
    header: "نظام الحصص",
    display: (data) => (
      <div className="flex flex-col items-center">
        <span className="font-semibold text-sm">{data.totalSessions} حصص</span>
        <span className="text-[11px] text-muted-foreground">
          {data.sessionDurationMinutes} دقيقة / للحصة
        </span>
      </div>
    ),
  },

  {
    key: "trainingTypeAtRegistration",
    header: "الناقل",
    display: (data) => (
      <Badge variant="outline" className="bg-muted/30">
        {enumTranslations[data.trainingTypeAtRegistration] ??
          data.trainingTypeAtRegistration}
      </Badge>
    ),
  },

  {
    key: "priceAtBooking",
    header: "السعر",
    display: (data) => (
      <div className="font-bold text-foreground whitespace-nowrap">
        {data.priceAtBooking.toLocaleString("ar-EG")} ج.م
      </div>
    ),
  },

  {
    key: "status",
    header: "الحالة",
    display: (data) => <StatusBadge status={data.status} />,
  },
  // 5. إضافة: تاريخ الاشتراك (أساسي في أي جدول اشتراكات)
  {
    key: "createdAt",
    header: "تاريخ التسجيل",
    display: (data) => (
      <div className="text-xs font-medium text-muted-foreground">
        {formatDate(data.createdAt)}
      </div>
    ),
  },
];
