import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgeDemo } from "@/components/CustomBadge/CustomBadge";
import ButtonAdd from "@/components/Table/ButtonAdd";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import type { SubscriptionDetails } from "@/types/subscription";
import { Link } from "react-router-dom";
import AddLesson from "@/Routes/OwnerRoutes/Lesson/Forms/AddLesson";
import { Button } from "@/components/ui/button";
import {
  RiCalendarEventLine,
  RiCalendarCloseLine,
  RiTimeLine,
  RiUser3Line,
  RiEyeLine,
} from "@remixicon/react";

type Props = {
  data: SubscriptionDetails;
};

export default function LessonsScheduleSection({ data }: Props) {
  const configDialogAdd = {
    title: "إضافة حصة جديدة",
    description: "قم بإدخال بيانات الحصة الجديدة للجدول.",
    children: (
      <AddLesson academyId={data.subscription.academy.id} data={data} />
    ),
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="lessons-section"
        className="rounded-2xl border border-border/60 bg-card px-5 shadow-sm transition-all duration-200 hover:shadow-md sm:px-6"
      >
        <AccordionTrigger className="py-5 hover:no-underline sm:py-6">
          <div className="flex items-center gap-3 text-right">
            <RiCalendarEventLine className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              جدول الحصص
            </h2>
            {data.subscription.lessons.length > 0 && (
              <span className="flex h-5 items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-semibold text-primary">
                {data.subscription.lessons.length}
              </span>
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent key={data.subscription.lessons.length}>
          <div className="flex flex-col gap-6 pb-4">
            <div className="flex items-center justify-end border-b border-border/50 pb-4">
              <ButtonAdd configDialogAdd={configDialogAdd} />
            </div>

            {data.subscription.lessons.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-muted/20 p-10 text-center transition-colors hover:bg-muted/30">
                <div className="mb-3 rounded-full border bg-background p-3 shadow-sm">
                  <RiCalendarCloseLine className="h-6 w-6 text-muted-foreground/80" />
                </div>
                <p className="text-base font-medium text-muted-foreground">
                  لا توجد حصص مجدولة حتى الآن.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {data.subscription.lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="group flex flex-col gap-4 rounded-xl border border-border/50 bg-background p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="flex items-center gap-1.5 text-lg font-bold tracking-wide text-foreground"
                          dir="ltr"
                        >
                          <RiTimeLine className="h-5 w-5 text-muted-foreground" />
                          {formatDate(lesson.startTime, "time")} -
                          {formatDate(lesson.endTime, "time")}
                        </span>
                        <span className="text-muted-foreground/50">|</span>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground/90">
                          <RiUser3Line className="h-4 w-4 text-muted-foreground" />
                          المدرب:
                          <span className="text-primary">
                            {lesson.captain.user.name}
                          </span>
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-md bg-secondary/80 px-2.5 py-1 font-semibold text-secondary-foreground">
                          {lesson.area.name}
                        </span>

                        <BadgeDemo
                          type={lesson.status}
                          text={enumTranslations[lesson.status]}
                        />

                        <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-muted-foreground">
                          {enumTranslations[lesson.transmission]}
                        </span>

                        {lesson.expectedAmount !== null && (
                          <span className="rounded-md bg-green-500/10 px-2.5 py-1 font-medium text-green-700 dark:text-green-400">
                            (المتوقع: {lesson.expectedAmount} ج)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-border/50 pt-4 sm:flex-col sm:items-end sm:justify-center sm:gap-3 sm:border-0 sm:pt-0">
                      <span className="text-sm font-medium text-muted-foreground bg-muted/30 sm:bg-transparent px-2 py-1 sm:p-0 rounded-md">
                        {formatDate(lesson.startTime)}
                      </span>

                      <Button variant="link" className="px-0 sm:px-4" asChild>
                        <Link
                          to={`/dashboard/lesson/${lesson.id}?academyId=${data.subscription.academy.id}`}
                          className="flex items-center gap-1.5"
                        >
                          <RiEyeLine className="h-4 w-4 opacity-80" />
                          تفاصيل الحصة
                        </Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
