import { calculatePaymentSummary } from "@/lib/calculatePaymentSummary";
import { getSubscriptionDetails } from "@/service/subscription.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ClientInfoSection } from "./components/ClientInfoSection";
import { CourseDetailsSection } from "./components/CourseDetailsSection";
import { PaymentHistorySection } from "./components/PaymentHistorySection";
import { LessonsScheduleSection } from "./components/LessonsScheduleSection";
import { BasicInfoSection } from "./components/BasicInfoSection";

export default function SubscriptionDetailsPage() {
  const { subscriptionId } = useParams();
  const [searchParams] = useSearchParams();
  const academyId = searchParams.get("academyId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["subscriptions", academyId, subscriptionId],
    queryFn: () =>
      getSubscriptionDetails({
        academyId: academyId!,
        subscriptionId: subscriptionId!,
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
    return <Navigate to={"/dashboard/subscription"} />;
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

  const paymentSummary = calculatePaymentSummary({
    payments: data.payments || [],
    totalRequiredAmount: data.priceAtBooking,
  });

  console.log(data)
  return (
    <main className="space-y-12">
      <BasicInfoSection data={data} paymentSummary={paymentSummary} />

      <ClientInfoSection client={data.client} />

      <CourseDetailsSection
        course={data.course}
        sessionDurationMinutes={data.sessionDurationMinutes}
        totalSessions={data.totalSessions}
      />

      <PaymentHistorySection
        paymentSummary={paymentSummary}
        payments={data.payments}
        priceAtBooking={data.priceAtBooking}
        academyId={data.academy.id}
        subscriptionId={subscriptionId}
      />

      <LessonsScheduleSection
      subscription={data}
      />
    </main>
  );
}
