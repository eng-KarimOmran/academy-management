import EmptyState from "@/components/EmptyState/EmptyState";
import { useParams } from "react-router-dom";
import { useUserDetails } from "../api/user.query";
import BasicInfoSection from "../components/BasicInfoSection";
import JobProfiles from "../components/JobProfiles";
import { useEffect } from "react";
import { toast } from "sonner";

export default function UserDetailsPage() {
  const { userId } = useParams();
  const { data, error, isLoading } = useUserDetails(userId);

  useEffect(() => {
    if (error) {
      toast.error(error.message ?? "حدث خطأ أثناء تحميل بيانات المستخدم.");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="text-center mt-10">جاري تحميل بيانات المستخدم...</div>
    );
  }

  if (!data) {
    return <EmptyState message="المستخدم غير موجود" />;
  }

  return (
    <div className="space-y-6">
      <BasicInfoSection user={data} />
      <JobProfiles jobProfiles={data.jobProfile} />
    </div>
  );
}