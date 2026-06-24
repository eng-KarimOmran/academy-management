import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getClientDetails } from "@/service/client.service";
import { useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { RiCalendarLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";
import { BadgeDemo } from "@/components/CustomBadge/CustomBadge";
import { enumTranslations } from "@/lib/enumTranslations";
import ButtonAdd from "@/components/Table/ButtonAdd";
import AddSubscription from "@/Routes/OwnerRoutes/Subscription/Forms/AddSubscription";

export default function ClientDetailsPage() {
  const { clientId } = useParams();
  const [searchParams] = useSearchParams();
  const academyId = searchParams.get("academyId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients", academyId, clientId],
    queryFn: () =>
      getClientDetails({
        params: {
          academyId: academyId!,
          clientId: clientId!,
        },
      }),
    select: (res) => res.data.data,
    enabled: !!academyId && !!clientId,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل الاشتراكات");
    }
  }, [error]);

  if (!academyId || !clientId) {
    return <Navigate to={"/not-found"} />;
  }

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center text-muted-foreground animate-pulse text-lg font-medium">
        جاري تحميل البيانات...
      </div>
    );
  }

  if (!data || !data.currentClient) {
    return (
      <div className="flex h-60 items-center justify-center text-muted-foreground text-lg font-medium">
        لا يوجد بيانات لعرضها
      </div>
    );
  }

  const { currentClient, otherFiles } = data;

  const configDialogAdd = {
    title: "إضافة اشتراك جديد",
    description: "قم بإدخال بيانات الاشتراك الجديد.",
    children: (
      <AddSubscription
        academyId={currentClient.academyId}
        clientId={currentClient.id}
      />
    ),
  };

  return (
    <section className="space-y-6">
      <div className="bg-card border rounded-2xl p-5 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
            {currentClient.name[0]}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {currentClient.name}
            </h3>

            <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <RiPhoneLine size={16} />
                <span>{currentClient.phone}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <RiCalendarLine size={16} />
                <span>{formatDate(currentClient.createdAt, "date")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full sm:w-auto gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none" asChild>
            <a
              href={`https://wa.me/2${currentClient.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiWhatsappLine />
              واتساب
            </a>
          </Button>

          <Button variant="outline" className="flex-1 sm:flex-none" asChild>
            <a href={`tel:+2${currentClient.phone}`}>
              <RiPhoneLine />
              اتصال
            </a>
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">الاشتراكات</h3>
            <p className="text-sm text-muted-foreground">
              إجمالي الاشتراكات: {currentClient.subscriptions.length}
            </p>
          </div>

          <ButtonAdd configDialogAdd={configDialogAdd} />
        </div>

        {currentClient.subscriptions.length ? (
          <ul className="space-y-3">
            {currentClient.subscriptions.map((s) => (
              <li
                key={s.id}
                className="flex flex-col gap-4 rounded-xl border p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="font-semibold truncate">{s.course.name}</h4>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDate(s.createdAt)}
                    </p>
                  </div>

                  <BadgeDemo
                    type={s.status}
                    text={enumTranslations[s.status]}
                  />
                </div>

                <div className="flex justify-end">
                  <Button size="sm" asChild>
                    <Link
                      to={`/dashboard/subscription/${s.id}?academyId=${currentClient.academyId}`}
                    >
                      تفاصيل الاشتراك
                    </Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            لا توجد اشتراكات لهذا العميل
          </div>
        )}
      </div>

      {otherFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">ملفات أخرى للعميل</h3>
          <ul className="space-y-2">
            {otherFiles.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm hover:bg-muted/40 transition-colors"
              >
                <div>
                  <p className="font-medium">{f.academy.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ملف عميل في الأكاديمية
                  </p>
                </div>
                <Button size="sm" asChild>
                  <Link
                    to={`/dashboard/client/${f.id}?academyId=${f.academy.id}`}
                  >
                    عرض الملف
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
