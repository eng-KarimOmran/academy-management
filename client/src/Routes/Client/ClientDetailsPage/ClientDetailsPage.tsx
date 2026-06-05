import { Navigate, useParams, useSearchParams } from "react-router-dom";
import BasicInfoSection from "./components/BasicInfoSection";
import SubscriptionsList from "./components/SubscriptionsList";
import { useQuery } from "@tanstack/react-query";
import { getClientDetails } from "@/service/client.service";
import { useEffect } from "react";
import { toast } from "sonner";
import OtherFilesList from "./components/OtherFilesList";

export default function ClientDetailsPage() {
  const { clientId } = useParams();
  const [searchParams] = useSearchParams();
  const academyId = searchParams.get("academyId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients", academyId, clientId],
    queryFn: () =>
      getClientDetails({
        academyId: academyId!,
        clientId: clientId!,
      }),
    select: (res) => res.data.data,
    enabled: !!academyId && !!clientId,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل الاشتراكات");
    }
  }, [error]);

  if (!academyId || !clientId) {
    return <Navigate to={"/dashboard/client"} />;
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

  return (
    <section className="space-y-6">
      <BasicInfoSection
        name={data.currentClient.name}
        phone={data.currentClient.phone}
        createdAt={data.currentClient.createdAt}
        clientSource={data.currentClient.clientSource}
      />
      <SubscriptionsList
        subscriptions={data.currentClient.subscriptions}
        academyId={academyId}
        phone={data.currentClient.phone}
      />
      <OtherFilesList otherFiles={data.otherFiles} />
    </section>
  );
}
