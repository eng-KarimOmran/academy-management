import type { SubscriptionDetails } from "@/types/subscription";
import { Link } from "react-router-dom";

type Props = {
  subscription: SubscriptionDetails["subscription"];
};

export default function ClientInfoSection({ subscription }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:p-6 shadow-sm">
      <div className="border-b border-border/50 pb-4">
        <h2 className="text-xl font-bold tracking-tight">بيانات العميل</h2>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
            {subscription.client.name[0]}
          </div>
          <div>
            <p className="text-base font-semibold">
              {subscription.client.name}
            </p>
            <p className="text-sm text-muted-foreground" dir="ltr">
              {subscription.client.phone}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`https://wa.me/2${subscription.client.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-100 px-3.5 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
          >
            واتساب
          </a>

          <a
            href={`tel:+2${subscription.client.phone}`}
            className="inline-flex items-center justify-center rounded-lg bg-blue-100 px-3.5 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
          >
            اتصال
          </a>

          <Link
            to={`/dashboard/client/${subscription.client.id}?academyId=${subscription.client.academyId}`}
            className="inline-flex items-center justify-center rounded-lg border bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            ملف العميل
          </Link>
        </div>
      </div>
    </div>
  );
}
