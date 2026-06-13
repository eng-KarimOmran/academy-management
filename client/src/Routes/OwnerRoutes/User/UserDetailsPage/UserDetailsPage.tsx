import { getUserDetails } from "@/service/user.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BasicInfoSection from "./components/BasicInfoSection";
import JobProfile from "./components/JobProfile";

export default function UserDetailsPage() {
  const { userId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserDetails({ userId: userId! }),
    select: (res) => res.data.data,
    enabled: !!userId,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "حدث خطأ أثناء تحميل البيانات");
    }
  }, [error]);

  if (!userId) return <Navigate to={"/dashboard/user"} />;

  if (isLoading) {
    return (
      <div className="text-center mt-10">جاري تحميل بيانات المستخدم...</div>
    );
  }

  if (!data)
    return (
      <div className="flex h-96 items-center justify-center text-muted-foreground">
        لا توجد بيانات لهذا المستخدم
      </div>
    );

  return (
    <div className="space-y-6">
      <BasicInfoSection data={data} />
      <JobProfile user={data} />
    </div>
  );
}
