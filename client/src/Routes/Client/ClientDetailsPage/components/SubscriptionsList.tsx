import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { enumTranslations } from "@/lib/enumTranslations";
import {
  RiSteering2Line,
  RiBillLine,
  RiArrowLeftLine,
  RiAddLine,
} from "@remixicon/react";
import type { SubscriptionBase } from "@/types/subscription";
import { Link } from "react-router-dom";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import ShowMore from "@/components/ShowMore/ShowMore";
import AddSubscription from "@/Routes/Subscription/Forms/AddSubscription";
import { useDialogState } from "@/store/DialogState";

interface SubscriptionsListProps {
  subscriptions: SubscriptionBase[];
  academyId: string;
  phone: string;
}

export default function SubscriptionsList({
  subscriptions,
  academyId,
  phone,
}: SubscriptionsListProps) {
  const { setConfigDialog } = useDialogState();

  const addSubscription = () => {
    setConfigDialog({
      title: "إضافة اشتراك جديد",
      description: "قم بإدخال بيانات الأشتراك الجديد.",
      children: <AddSubscription academyId={academyId} phone={phone} />,
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="flex items-center gap-2 font-bold text-lg text-foreground">
          <RiSteering2Line className="text-primary" size={20} />
          الاشتراكات الحالية
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {subscriptions.length}
          </span>
        </h3>

        <Button size="sm" onClick={addSubscription}>
          <RiAddLine size={18} />
          إضافة اشتراك
        </Button>
      </div>

      <ul className="flex flex-col gap-4">
        {subscriptions.map((sub) => (
          <li
            key={sub.id}
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-card p-5 rounded-2xl border border-border shadow-sm transition-all hover:shadow-md hover:border-primary/30"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <RiBillLine size={24} />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h4 className="font-bold text-base text-foreground leading-none tracking-tight">
                    {sub.course.name}
                  </h4>
                  <Badge
                    variant={
                      sub.status === "ACTIVE"
                        ? "success"
                        : sub.status === "CANCELED"
                          ? "destructive"
                          : sub.status === "COMPLETED"
                            ? "default"
                            : "warning"
                    }
                    className="font-semibold px-2 py-0.5 text-md rounded-md"
                  >
                    {enumTranslations[sub.status]}
                  </Badge>
                </div>

                <div className="flex items-center gap-2" dir="ltr">
                  <div className="flex items-center gap-2 bg-muted/50 border border-border/50 px-3 py-1.5 rounded-lg">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      ID
                    </span>
                    <div className="h-3 w-px bg-border/80 mx-0.5" />
                    <span className="text-xs font-mono font-semibold text-foreground tracking-tighter">
                      <ShowMore text={sub.id.toUpperCase()} columns={4} />
                    </span>
                  </div>
                  <CopyBtn text={sub.id} />
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto shrink-0 mt-4 sm:mt-0">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto h-11 px-6 rounded-xl font-bold gap-2 bg-background hover:bg-secondary transition-all active:scale-95"
              >
                <Link
                  to={`/dashboard/subscription/${sub.id}?academyId=${academyId}`}
                >
                  تفاصيل الاشتراك
                  <RiArrowLeftLine
                    size={18}
                    className="text-muted-foreground transition-transform group-hover:-translate-x-1"
                  />
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
