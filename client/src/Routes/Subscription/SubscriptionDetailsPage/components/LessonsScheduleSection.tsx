import {
  RiUserStarFill,
  RiMapPinRangeFill,
  RiCarFill,
  RiTimeLine,
  RiMoneyDollarCircleLine,
  RiUserSmileLine,
} from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import { formatDate } from "@/lib/utils";
import { enumTranslations } from "@/lib/enumTranslations";

import { InfoSection } from "@/components/InfoSection/InfoSection";
import type { Subscription } from "@/types/subscription";
import { Button } from "@/components/ui/button";
import { useDialogState } from "@/store/DialogState";
import AddLesson from "@/Routes/Lesson/Forms/AddLesson";
import { Link } from "react-router-dom";

interface LessonsScheduleSectionProp {
  subscription: Subscription;
}

export const LessonsScheduleSection = ({
  subscription,
}: LessonsScheduleSectionProp) => {
  const { setConfigDialog } = useDialogState();

  const isSubscriptionFullyBooked =
    subscription.lessons.filter((l) => l.status !== "CANCELED").length ===
    subscription.totalSessions;

  const isDisabledStatus = [
    "PENDING_PAYMENT",
    "PAUSED",
    "POSTPONED",
    "COMPLETED",
    "CANCELED",
  ].includes(subscription.status);

  const addLesson = () => {
    setConfigDialog({
      title: "إضافة معاملة جديدة",
      description: "قم بإدخال بيانات المعاملة الجديدة.",
      children: (
        <AddLesson
          academyId={subscription.academy.id}
          subscription={subscription}
        />
      ),
    });
  };

  const config = {
    title: "جدول الحصص",
    action: (
      <Button
        disabled={isDisabledStatus || isSubscriptionFullyBooked}
        onClick={addLesson}
        size="sm"
      >
        حجز حصة
      </Button>
    ),
  };

  return (
    <InfoSection {...config}>
      <ul className="space-y-4">
        {subscription.lessons.map((l) => (
          <li
            key={l.id}
            className="border border-border rounded-xl shadow-sm bg-card overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Header: ID, Status, Actions */}
            <div className="bg-muted/30 border-b border-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">
                    معرف الحصة
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      #{l.id.slice(0, 10).toLocaleUpperCase()}
                    </span>
                    <CopyBtn text={l.id} />
                  </div>
                </div>
                <Badge
                  variant={
                    l.status === "COMPLETED"
                      ? "success"
                      : l.status === "SCHEDULED"
                        ? "warning"
                        : "destructive"
                  }
                  className="mt-4 sm:mt-0"
                >
                  {enumTranslations[l.status]}
                </Badge>
              </div>

              <Button variant="outline" size="sm" asChild>
                <Link
                  to={`/dashboard/lesson/${l.id}?academyId=${subscription.academy.id}`}
                >
                  تفاصيل الحصة
                </Link>
              </Button>
            </div>

            {/* Body: Lesson Details */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1: Time & Money */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                    <RiTimeLine className="w-4 h-4 text-primary" />
                    توقيت الحصة
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/20 p-2 rounded-md space-y-1">
                    <div className="flex justify-between">
                      <span>البداية:</span>
                      <span dir="ltr">{formatDate(l.startTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>النهاية:</span>
                      <span dir="ltr">{formatDate(l.endTime)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-muted/20 p-2 rounded-md">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <RiMoneyDollarCircleLine className="w-4 h-4 text-primary" />
                    المبلغ المتوقع
                  </span>
                  <span className="text-sm font-bold">
                    {l.expectedAmount ? `${l.expectedAmount} ج.م` : "لا يوجد"}
                  </span>
                </div>
              </div>

              {/* Column 2: People Involved */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                    <RiUserStarFill className="w-4 h-4 text-primary" />
                    الكابتن
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/20 p-2 rounded-md">
                    <p className="font-medium text-foreground">
                      {l.captain.user.name}
                    </p>
                    <p className="text-xs">{l.captain.user.phone}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                    <RiUserSmileLine className="w-4 h-4 text-primary" />
                    العميل
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/20 p-2 rounded-md">
                    <p className="font-medium text-foreground">
                      {l.client.name}
                    </p>
                    <p className="text-xs">{l.client.phone}</p>
                  </div>
                </div>
              </div>

              {/* Column 3: Location & Car */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                    <RiMapPinRangeFill className="w-4 h-4 text-primary" />
                    المنطقة
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/20 p-2 rounded-md">
                    <p>{l.area.name}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                    <RiCarFill className="w-4 h-4 text-primary" />
                    المركبة
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/20 p-2 rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">
                        {l.car.modelName}
                      </p>
                      <p className="text-xs">اللوحة: {l.car.plateNumber}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {enumTranslations[l.transmission] || l.transmission}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </InfoSection>
  );
};
