import { calculatePaymentSummary } from "@/lib/calculatePaymentSummary";
import { getSubscriptionDetails } from "@/service/subscription.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import BasicInfoSection from "./components/BasicInfoSection";
import ClientInfoSection from "./components/ClientInfoSection";
import PaymentHistorySection from "./components/PaymentHistorySection";
import LessonsScheduleSection from "./components/LessonsScheduleSection";

export default function SubscriptionDetailsPage() {
  const { subscriptionId } = useParams();
  const [searchParams] = useSearchParams();
  const academyId = searchParams.get("academyId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["subscriptions", academyId, subscriptionId],
    queryFn: () =>
      getSubscriptionDetails({
        params: {
          academyId: academyId!,
          subscriptionId: subscriptionId!,
        },
      }),
    select: (res) => res.data.data,
    enabled: !!academyId && !!subscriptionId,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل الاشتراكات");
    }
  }, [error]);

  if (!academyId || !subscriptionId) {
    return <Navigate to={"/not-found"} />;
  }

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center text-muted-foreground">
        جاري تحميل البيانات...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-60 items-center justify-center text-muted-foreground">
        لا يوجد بيانات لعرضها
      </div>
    );
  }

  console.log(data)

  const paymentSummary = calculatePaymentSummary({
    payments: data.ledgerTransactions,
    totalRequiredAmount: data.subscription.priceAtBooking,
  });

  return (
    <main className="space-y-12">
      <BasicInfoSection
        data={data.subscription}
        paymentSummary={paymentSummary}
      />

      <ClientInfoSection subscription={data.subscription} />

      <PaymentHistorySection
        academyId={data.subscription.academy.id}
        subscriptionId={data.subscription.id}
        payments={data.ledgerTransactions}
      />

      <LessonsScheduleSection data={data} />
    </main>
  );
}
