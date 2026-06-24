import {
  RiBookReadFill,
  RiMoneyDollarCircleLine,
  RiDiscountPercentLine,
  RiListOrdered,
  RiTimeLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiFileTextLine,
  RiEditLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import type { CourseDetails } from "@/types/course";
import ShowMore from "@/components/ShowMore/ShowMore";
import { useIsMobile } from "@/hooks/use-mobile";

export default function BasicDataSection({
  item: course,
  title = "البيانات الأساسية للدورة",
  onEdit,
}: {
  item: CourseDetails;
  title?: string;
  onEdit: () => void;
}) {
  const isMobile = useIsMobile();

  const basicData = [
    {
      label: "اسم الدورة",
      value: course.name,
      icon: <RiBookReadFill />,
    },
    {
      label: "الوصف",
      value: course.description || "لا يوجد وصف",
      icon: <RiFileTextLine />,
    },
    {
      label: "السعر الأساسي",
      value: `${course.priceOriginal} ج.م`,
      icon: <RiMoneyDollarCircleLine />,
    },
    {
      label: "السعر بعد الخصم",
      value: course.priceDiscounted
        ? `${course.priceDiscounted} ج.م`
        : "لا يوجد خصم",
      icon: <RiDiscountPercentLine />,
    },
    {
      label: "إجمالي الحصص",
      value: `${course.totalSessions} حصة`,
      icon: <RiListOrdered />,
    },
    {
      label: "مدة الحصة الواحدة",
      value: `${course.sessionDurationMinutes} دقيقة`,
      icon: <RiTimeLine />,
    },
    {
      label: "الحد الأدنى للديبوزت",
      value: `${course.requiredInitialDeposit} ج.م`,
      icon: <RiTimeLine />,
    },
    {
      label: "عدد الحصص قبل سداد كامل المبلغ.",
      value: `${course.sessionDurationMinutes} حصة`,
      icon: <RiTimeLine />,
    },
    {
      label: "حالة الدورة",
      value: course.isActive ? "نشطة" : "غير نشطة",
      icon: course.isActive ? (
        <RiCheckboxCircleLine className="text-emerald-500" />
      ) : (
        <RiCloseCircleLine className="text-destructive" />
      ),
    },
  ];

  return (
    <div className="bg-card border rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            {course.name}
          </h2>
          <p className="text-muted-foreground text-sm">{title}</p>
        </div>
        <Button className="flex items-center gap-2" onClick={onEdit}>
          <RiEditLine size={18} /> تعديل البيانات
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
        {basicData.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-background shadow-sm rounded-lg text-primary shrink-0">
              {item.icon}
            </div>
            <div className="overflow-hidden w-full">
              <p className="text-sm text-muted-foreground mb-0.5">
                {item.label}
              </p>
              <div className="font-semibold text-base md:text-lg">
                {item.label === "الوصف" || isMobile ? (
                  <ShowMore text={item.value.toString()} />
                ) : (
                  <span className="truncate block">{item.value}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
