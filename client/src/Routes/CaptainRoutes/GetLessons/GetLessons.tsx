import { getLessonsCaptains } from "@/service/captain.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { LessonCard } from "./Components/LessonCard/LessonCard";
import { useAuthState } from "@/store/AuthState";
import { getDateRange } from "@/lib/utils";

export default function GetLessons({ day }: { day?: "today" | "tomorrow" }) {
  const { user } = useAuthState();
  const userId = user?.id;
  const dateRange = getDateRange(day);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lessons", day],
    queryFn: () => getLessonsCaptains({ userId: userId!, ...dateRange }),
    select: (res) => res.data.data,
    enabled: !!userId,
  });

  useEffect(() => {
    if (error) toast.error(error.message || "خطأ في تحميل الحصص");
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        <span>جاري تحميل الحصص...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        لا توجد حصص
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-xl mx-auto" dir="rtl">
      {data.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}