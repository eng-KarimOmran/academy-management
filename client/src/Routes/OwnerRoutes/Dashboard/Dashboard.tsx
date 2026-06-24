import CardDashboard from "@/components/CardDashboard/CardDashboard";
import { ChartBarLabel } from "@/components/ChartBarLabel/ChartBarLabel";
import { ChartPieLabel } from "@/components/ChartPieLabel/ChartPieLabel";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import { useDialogState } from "@/store/DialogState";
import {
  RiBookOpenLine,
  RiMoneyDollarCircleLine,
  RiUserSearchFill,
} from "@remixicon/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DateForm, { type DateFormProps } from "./forms/DateForm";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { getDashboardAnalytics } from "@/service/statistics.service";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "./components/LoadingPage";

export default function Dashboard() {
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id;
  const { setConfigDialog } = useDialogState();

  const [date, setDate] = useState<DateFormProps>({
    startDate: dayjs().toISOString(),
    endDate: dayjs().toISOString(),
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", academyId, date.startDate, date.endDate],
    queryFn: () =>
      getDashboardAnalytics({
        params: { academyId: academyId! },
        query: date,
      }),
    select: (res) => res.data.data,
    enabled: !!academyId,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل الكورسات");
    }
  }, [error]);

  return (
    <section className="p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">لوحة التحكم</h1>
          <p className="text-sm text-muted-foreground mt-1">
            نظرة عامة على أداء الأكاديمية
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              const dateToDay = dayjs().startOf("day").toISOString();
              setDate({
                startDate: dateToDay,
                endDate: dateToDay,
              });
            }}
          >
            مسح الفلتر
          </Button>
          <Button
            onClick={() => {
              setConfigDialog({
                title: "حدد الفترة الزمنية",
                description: "قم بتحديد الفترة الزمنية",
                children: <DateForm setDate={setDate} date={date} />,
              });
            }}
          >
            تعيين فلتر
          </Button>
        </div>
      </div>

      {isLoading ? (
        <LoadingPage />
      ) : data ? (
        <main className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardDashboard
              title="إجمالي الإيرادات"
              value={`${data.transactions.totalCollected} ج.م`}
              subtext={`المسترجع: ${data.transactions.totalRefund} ج.م`}
              icon={<RiMoneyDollarCircleLine />}
            />
            <CardDashboard
              title="إجمالي العملاء"
              value={data.clients.totalClient}
              subtext={`${data.subscriptions.totalSubscription} اجمالي الأشتركات`}
              icon={<RiUserSearchFill />}
            />
            <CardDashboard
              title="إجمالي الحصص"
              value={data.lessons.totalLesson}
              subtext={`${data.lessons.lessonCompleted} مكتملة`}
              icon={<RiBookOpenLine />}
            />
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              العملاء والحصص
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartPieLabel
                title="مصدر العملاء"
                description="عملاء المكتب مقابل عملاء الموقع"
                chartData={[
                  {
                    label: "المكتب",
                    value: data.clients.officeCount,
                    fill: "var(--chart-1)",
                  },
                  {
                    label: "الموقع",
                    value: data.clients.platformCount,
                    fill: "var(--chart-2)",
                  },
                ]}
              />
              <ChartPieLabel
                title="نوع الحصص"
                description="مانيوال مقابل أوتوماتيك"
                chartData={[
                  {
                    label: "مانيوال",
                    value: data.lessons.lessonManual,
                    fill: "var(--chart-3)",
                  },
                  {
                    label: "أوتوماتيك",
                    value: data.lessons.lessonAutomatic,
                    fill: "var(--chart-4)",
                  },
                ]}
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              الإحصائيات المالية والاشتراكات
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartBarLabel
                title="حالة الاشتراك"
                description="حلات الاشتراكات"
                chartData={[
                  {
                    label: "نشط",
                    value: data.subscriptions.subscriptionActive,
                    fill: "var(--chart-1)",
                  },
                  {
                    label: "باقى عليه فلوس",
                    value: data.subscriptions.subscriptionActiveLimited,
                    fill: "var(--chart-1)",
                  },
                  {
                    label: "ملغي",
                    value: data.subscriptions.subscriptionCanceled,
                    fill: "var(--chart-1)",
                  },
                  {
                    label: "مكتمل",
                    value: data.subscriptions.subscriptionCompleted,
                    fill: "var(--chart-1)",
                  },
                  {
                    label: "منتظر دفع الديبوزت",
                    value: data.subscriptions.subscriptionPendingDeposit,
                    fill: "var(--chart-1)",
                  },
                ]}
              />
              <ChartBarLabel
                title="الحركة المالية"
                description="الكاش و المحفظة الألكترونيه"
                chartData={[
                  {
                    label: "كاش",
                    value: data.transactions.totalCash,
                    fill: "var(--chart-1)",
                  },
                  {
                    label: "محفطة",
                    value: data.transactions.totalWallet,
                    fill: "var(--chart-1)",
                  },
                ]}
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              الحصص والكورسات
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartBarLabel
                title="حالة الحصص"
                description="توزيع الحصص حسب الحالة"
                chartData={[
                  {
                    label: "ملغية",
                    value: data.lessons.lessonCanceled,
                    fill: "var(--chart-1)",
                  },
                  {
                    label: "ملغية مع احتساب رسوم",
                    value: data.lessons.lessonCanceledCharged,
                    fill: "var(--chart-2)",
                  },
                  {
                    label: "مكتملة",
                    value: data.lessons.lessonCompleted,
                    fill: "var(--chart-3)",
                  },
                  {
                    label: "مجدولة",
                    value: data.lessons.lessonScheduled,
                    fill: "var(--chart-4)",
                  },
                ]}
              />
              <ChartBarLabel
                title="اشتراكات الكورسات"
                description="عدد المشتركين في كل كورس"
                chartData={data.courses.map((c, i) => ({
                  label: c.name,
                  value: c.count,
                  fill: `var(--chart-${i + 1})`,
                }))}
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              الكباتن و السكرتريات
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartBarLabel
                title="الكباتن"
                description="عدد الحصص التي أكملها الكباتن"
                chartData={data.captain.map((c, i) => ({
                  label: `${c.name}-${c.phone}`,
                  value: c.countLesson,
                  fill: `var(--chart-${i + 1})`,
                }))}
              />
              <ChartBarLabel
                title="السكرتيرات"
                description="عدد الاشتراكات التي حققتها السكرتيرات"
                chartData={data.usersCreatedSubscription.map((s, i) => ({
                  label: `${s.name}-${s.phone}`,
                  value: s.countSubscription,
                  fill: `var(--chart-${i + 1})`,
                }))}
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              المناطق و السيارات
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartBarLabel
                title="المناطق"
                description="عدد الحصص التي تمت فى المناطق"
                chartData={data.area.map((a, i) => ({
                  label: a.name,
                  value: a.countLesson,
                  fill: `var(--chart-${i + 1})`,
                }))}
              />
              <ChartBarLabel
                title="السيارات"
                description="عدد الحصص التي تمم على السيارات"
                chartData={data.car.map((c, i) => ({
                  label: `${c.modelName}-${c.plateNumber}`,
                  value: c.countLesson,
                  fill: `var(--chart-${i + 1})`,
                }))}
              />
            </div>
          </div>
        </main>
      ) : (
        <div>لا يوجد بيانات لعرضها</div>
      )}
    </section>
  );
}