import { LessonStatus } from "@/types/enums";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LessonBase } from "@/types/lesson";
import { formatDate } from "@/lib/utils";
import {
  RiCheckboxCircleLine,
  RiPhoneFill,
  RiWhatsappLine,
} from "@remixicon/react";
import { useDialogState } from "@/store/DialogState";
import ChangeLessonStateByCaptainForm from "../../Forms/ChangeLessonStateByCaptainForm";
import dayjs from "dayjs";

interface LessonCardProps {
  lesson: LessonBase;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const { setConfigDialog } = useDialogState();
  const isCompleted = lesson.status === LessonStatus[1];

  const canComplete = dayjs().isAfter(
    dayjs(lesson.endTime).subtract(10, "minute"),
  );

  const onComplete = () => {
    setConfigDialog({
      title: "اكمال الحصة",
      description: lesson.expectedAmount
        ? "غير المبلغ اذا كان غير صحيح"
        : "لأكمال الحصة اضغط على الزر",
      children: <ChangeLessonStateByCaptainForm lesson={lesson} />,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-full flex justify-center items-center bg-accent">
              {lesson.client.name[0]}
            </div>
            <div className="flex flex-col">
              <span>{lesson.client.name}</span>
              <span>{lesson.client.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>{formatDate(lesson.startTime, "time")}</span>
            <span>-</span>
            <span>{formatDate(lesson.endTime, "time")}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant={"secondary"} asChild>
            <a
              href={`https://wa.me/2${lesson.client.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiWhatsappLine />
              <span>واتساب</span>
            </a>
          </Button>
          <Button variant={"outline"} asChild>
            <a
              href={`tel:2${lesson.client.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiPhoneFill />
              <span>اتصال هاتفي</span>
            </a>
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div>{lesson.area.name}</div>
          <div>{lesson.academy.name}</div>
          <div className="bg-accent rounded-md p-1 text-xs">{`${lesson.car.modelName} . ${lesson.car.plateNumber}`}</div>
          {lesson.expectedAmount > 0 && (
            <div className="flex items-center gap-1 text-yellow-500">
              <span>يجب تحصيل مبلغ</span>
              <span>{lesson.expectedAmount}</span>
              <span>ج.م</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-full flex justify-center items-center bg-accent">
              {lesson.captain.user.name[0]}
            </div>
            <div className="flex flex-col">
              <span className="to-muted text-xs">الكابتن</span>
              <span>{lesson.captain.user.name}</span>
            </div>
          </div>
          {isCompleted ? (
            <RiCheckboxCircleLine className="text-green-500" />
          ) : (
            <Button disabled={!canComplete} onClick={onComplete}>
              اكملت الحصة
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}