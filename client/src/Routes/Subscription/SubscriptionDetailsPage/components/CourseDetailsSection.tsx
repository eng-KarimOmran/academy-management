import {
  RiBookOpenLine,
  RiTimerLine,
  RiHashtag,
  RiSettings4Line,
} from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { InfoSection } from "@/components/InfoSection/InfoSection";
import type { Subscription } from "@/types/subscription";

interface CourseDetailsSectionProp {
  course: Subscription["course"];
  sessionDurationMinutes: number;
  totalSessions: number;
}

export const CourseDetailsSection = ({
  course,
  sessionDurationMinutes,
  totalSessions,
}: CourseDetailsSectionProp) => (
  <InfoSection title="تفاصيل الدورة التدريبية">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* اسم الدورة */}
      <div className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card/50">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <RiBookOpenLine size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">
            اسم الدورة
          </span>
          <span className="text-sm font-bold text-foreground leading-tight">
            {course.name}
          </span>
        </div>
      </div>
      {/* مدة الحصة */}
      <div className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card/50">
        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
          <RiTimerLine size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">
            مدة الحصة
          </span>
          <span className="text-sm font-bold text-foreground">
            {sessionDurationMinutes} دقيقة
          </span>
        </div>
      </div>
      {/* إجمالي الحصص */}
      <div className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card/50">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
          <RiHashtag size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">
            إجمالي الحصص
          </span>
          <span className="text-sm font-bold text-foreground">
            {totalSessions} حصة
          </span>
        </div>
      </div>
      {/* حالة الدورة */}
      <div className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card/50">
        <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
          <RiSettings4Line size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground font-medium">
            حالة الدورة
          </span>
          <Badge
            variant={course.isActive ? "success" : "destructive"}
            className="w-fit text-[10px] px-2 py-0"
          >
            {course.isActive ? "نشطة" : "متوقفة"}
          </Badge>
        </div>
      </div>
    </div>
  </InfoSection>
);
