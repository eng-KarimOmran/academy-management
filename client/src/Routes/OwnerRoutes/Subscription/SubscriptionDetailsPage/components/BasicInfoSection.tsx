import { BadgeDemo } from "@/components/CustomBadge/CustomBadge";
import type { CalculatePaymentSummary } from "@/lib/calculatePaymentSummary";
import { enumTranslations } from "@/lib/enumTranslations";
import type { SubscriptionDetails } from "@/types/subscription";
import type { ReactNode } from "react";

type Props = {
  data: SubscriptionDetails;
  paymentSummary: CalculatePaymentSummary;
};

export default function BasicInfoSection({ data, paymentSummary }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border bg-card p-5 sm:p-6 shadow-sm">
      <div className="border-b border-border/50 pb-4">
        <h2 className="text-xl font-bold tracking-tight">ملخص الاشتراك</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
        <Info
          label="الحالة"
          value={
            <BadgeDemo
              type={data.status}
              text={enumTranslations[data.status]}
            />
          }
        />
        <Info label="السعر" value={`${data.priceAtBooking} جنيه`} />
        <Info label="الحصص" value={`${data.totalSessions} حصص`} />
        <Info
          label="مدة الحصة"
          value={`${data.sessionDurationMinutes} دقيقة`}
        />
        <Info label="المنطقة" value={data.area.name} />
        <Info label="الكورس" value={data.course.name} />

        <Info
          label="المدفوع"
          value={`${paymentSummary.netPaid} جنيه`}
          highlight
        />
        <Info
          label="المتبقي"
          value={`${paymentSummary.remaining} جنيه`}
          highlight={paymentSummary.remaining > 0}
        />
      </div>
    </div>
  );
}

type InfoProps = {
  label: string;
  value: ReactNode;
  highlight?: boolean;
};

function Info({ label, value, highlight }: InfoProps) {
  return (
    <div
      className={`flex flex-col justify-center gap-1.5 rounded-xl border p-3 sm:p-4 transition-colors ${
        highlight
          ? "border-primary/20 bg-primary/5"
          : "border-transparent bg-muted/40 hover:bg-muted/60"
      }`}
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="text-sm font-semibold sm:text-base">{value}</div>
    </div>
  );
}
