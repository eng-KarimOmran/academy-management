import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { RiCalendarLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";

import { getClientDetails } from "@/service/client.service";
import { Button } from "@/components/ui/button";
import { BadgeDemo } from "@/components/CustomBadge/CustomBadge";
import ButtonAdd from "@/components/Table/ButtonAdd";
import AddSubscription from "@/Routes/OwnerRoutes/Subscription/Forms/AddSubscription";
import { formatDate } from "@/lib/utils";
import { enumTranslations } from "@/lib/enumTranslations";
import EmptyState from "@/components/EmptyState/EmptyState";

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function SubscriptionCard({
  subscription,
  academyId,
}: {
  subscription: SubscriptionBase;
  academyId: string;
}) {
  const {
    id,
    subscriptionStatus,
    createdAt,
    priceAtBooking,
    totalSessions,
    sessionDurationMinutes,
    trainingTypeAtRegistration,
    requiredInitialDeposit,
    sessionsBeforeFullPayment,
  } = subscription;

  return (
    <li className="rounded-xl border bg-card p-4 space-y-4 hover:bg-muted/30 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">
          {formatDate(createdAt)}
        </span>
        <BadgeDemo
          type={subscriptionStatus}
          text={enumTranslations[subscriptionStatus]}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatItem label="السعر" value={`${priceAtBooking} ج.م`} />
        <StatItem label="عدد الجلسات" value={totalSessions} />
        <StatItem
          label="مدة الجلسة"
          value={`${sessionDurationMinutes} دقيقة`}
        />
        <StatItem
          label="نوع التدريب"
          value={enumTranslations[trainingTypeAtRegistration]}
        />
        <StatItem
          label="الدفعة المقدمة"
          value={`${requiredInitialDeposit} ج.م`}
        />
        <StatItem label="جلسات قبل السداد" value={sessionsBeforeFullPayment} />
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <Button size="sm" asChild>
          <Link to={`/dashboard/subscription/${id}?academyId=${academyId}`}>
            تفاصيل الاشتراك
          </Link>
        </Button>
      </div>
    </li>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClientDetailsPage() {
  const { clientId } = useParams();
  const [searchParams] = useSearchParams();
  const academyId = searchParams.get("academyId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients", academyId, clientId],
    queryFn: () => {
      if (!clientId || !academyId)
        throw Error("معرف العميل والأكاديمية مطلوبان");
      return getClientDetails({
        params: { academyId },
        query: { clientId },
      });
    },
    select: (res) => res.data.data,
    enabled: !!academyId && !!clientId,
  });

  useEffect(() => {
    if (error) toast.error(error.message || "خطأ في تحميل البيانات");
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center text-muted-foreground animate-pulse text-lg font-medium">
        جاري تحميل البيانات...
      </div>
    );
  }

  if (!data) {
    return <EmptyState message="ملف العميل غير موجود" />;
  }

  const { currentClient, otherFiles } = data;

  const addSubscriptionDialog = {
    title: "إضافة اشتراك جديد",
    description: "قم بإدخال بيانات الاشتراك الجديد.",
    children: (
      <AddSubscription
        academyId={currentClient.academyId}
        clientId={currentClient.id}
      />
    ),
  };

  return (
    <section className="space-y-6">
      {/* Client card */}
      <div className="bg-card border rounded-2xl p-5 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold shrink-0">
            {currentClient.name[0]}
          </div>

          <div>
            <h3 className="text-lg font-semibold">{currentClient.name}</h3>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <RiPhoneLine size={15} />
                {currentClient.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <RiCalendarLine size={15} />
                {formatDate(currentClient.createdAt, "date")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full sm:w-auto gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none" asChild>
            <a
              href={`https://wa.me/2${currentClient.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiWhatsappLine />
              واتساب
            </a>
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none" asChild>
            <a href={`tel:+2${currentClient.phone}`}>
              <RiPhoneLine />
              اتصال
            </a>
          </Button>
        </div>
      </div>

      {/* Subscriptions */}
      <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">الاشتراكات</h3>
            <p className="text-sm text-muted-foreground">
              الإجمالي: {currentClient.subscriptions.length}
            </p>
          </div>
          <ButtonAdd configDialogAdd={addSubscriptionDialog} />
        </div>

        {currentClient.subscriptions.length ? (
          <ul className="space-y-3">
            {currentClient.subscriptions.map((s) => (
              <SubscriptionCard
                key={s.id}
                subscription={s}
                academyId={currentClient.academyId}
              />
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            لا توجد اشتراكات لهذا العميل
          </div>
        )}
      </div>

      {/* Other academy files */}
      {otherFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">
            ملفات العميل في أكاديميات أخرى
          </h3>
          <ul className="space-y-2">
            {otherFiles.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm hover:bg-muted/40 transition-colors"
              >
                <div>
                  <p className="font-medium">{f.academy.name}</p>
                  <p className="text-sm text-muted-foreground">ملف عميل</p>
                </div>
                <Button size="sm" asChild>
                  <Link
                    to={`/dashboard/client/${f.id}?academyId=${f.academy.id}`}
                  >
                    عرض الملف
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
