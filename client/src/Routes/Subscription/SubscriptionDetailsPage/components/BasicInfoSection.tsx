import { Badge } from "@/components/ui/badge";
import ShowMore from "@/components/ShowMore/ShowMore";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import { formatDate } from "@/lib/utils";
import { enumTranslations } from "@/lib/enumTranslations";
import { InfoSection } from "@/components/InfoSection/InfoSection";
import type { Subscription } from "@/types/subscription";
import type { CalculatePaymentSummary } from "@/lib/calculatePaymentSummary";

type BasicInfoSectionProp = {
  data: Pick<Subscription, "id" | "status" | "createdAt" | "priceAtBooking">;
  paymentSummary: CalculatePaymentSummary;
};

export const BasicInfoSection = ({
  data,
  paymentSummary,
}: BasicInfoSectionProp) => (
  <InfoSection title="البيانات الأساسية">
    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* معرف الاشتراك */}
      <div className="bg-background p-4 rounded-lg border border-border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-hover hover:shadow-md">
        <dt className="text-sm font-medium text-muted-foreground">
          معرف الاشتراك
        </dt>
        <dd className="flex items-center justify-between gap-2 font-mono text-sm bg-muted px-1 sm:px-2 py-1 rounded">
          <span className="uppercase tracking-wider">
            <ShowMore text={data.id} columns={4} />
          </span>
          <CopyBtn text={data.id} />
        </dd>
      </div>

      {/* حالة الاشتراك */}
      <div className="bg-background p-4 rounded-lg border border-border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-hover hover:shadow-md">
        <dt className="text-sm font-medium text-muted-foreground">
          حالة الاشتراك
        </dt>
        <dd>
          <Badge
            variant={
              data.status === "ACTIVE"
                ? "success"
                : data.status === "CANCELED"
                  ? "destructive"
                  : "warning"
            }
          >
            {enumTranslations[data.status]}
          </Badge>
        </dd>
      </div>

      {/* مبلغ الاشتراك */}
      <div className="bg-background p-4 rounded-lg border border-border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-hover hover:shadow-md">
        <dt className="text-sm font-medium text-muted-foreground">
          مبلغ الاشتراك
        </dt>
        <dd className="text-lg font-bold text-primary">
          {data.priceAtBooking}
          <span className="text-xs font-normal mr-1">ج.م</span>
        </dd>
      </div>

      {/* المبلغ المتبقي */}
      <div
        className={`p-4 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-hover hover:shadow-md ${
          paymentSummary.remaining > 0
            ? "bg-orange-50/30 border-orange-200"
            : "bg-background"
        }`}
      >
        <dt className="text-sm font-medium text-muted-foreground">
          المبلغ المتبقي
        </dt>
        <dd className="flex items-center gap-2">
          <span
            className={`text-lg font-bold ${paymentSummary.remaining > 0 ? "text-orange-600" : "text-success"}`}
          >
            {paymentSummary.remaining}
            <span className="text-xs font-normal mr-1 text-muted-foreground">
              ج.م
            </span>
          </span>
          {paymentSummary.isFullyPaid && (
            <Badge variant="success" className="h-5 text-[10px]">
              خالص
            </Badge>
          )}
        </dd>
      </div>

      <div className="bg-background p-4 rounded-lg border border-border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-hover hover:shadow-md md:col-span-2">
        <dt className="text-sm font-medium text-muted-foreground">
          تاريخ الاشتراك
        </dt>
        <dd className="text-sm font-semibold">{formatDate(data.createdAt)}</dd>
      </div>
    </dl>
  </InfoSection>
);
