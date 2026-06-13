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
import { useDashboardStatistics } from "@/hooks/useDashboardStatistics";
import dayjs from "dayjs";

export default function Dashboard() {
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id;
  const { setConfigDialog } = useDialogState();
  const [date, setDate] = useState<DateFormProps>({
    startDate: dayjs().toISOString(),
    endDate: dayjs().toISOString(),
  });

  const results = useDashboardStatistics({ academyId, ...date });

  const [lessonsQuery, clientsQuery, coursesQuery, transactionsQuery] = results;
  const isLoading = results.some((query) => query.isLoading);

  useEffect(() => {
    results.forEach((query) => {
      if (query.error) {
        toast.error(
          query.error.message || "حدث خطأ أثناء تحميل بيانات الإحصائيات",
        );
      }
    });
  }, [results]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground text-sm">جاري التحميل...</p>
      </div>
    );
  }

  const lessons = lessonsQuery.data;
  const clients = clientsQuery.data;
  const courses = coursesQuery.data;
  const transactions = transactionsQuery.data;

  return (
    <section className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">لوحة التحكم</h1>
        <p className="text-sm text-muted-foreground mt-1">
          نظرة عامة على أداء الأكاديمية
        </p>
        <div className="flex items-center gap-2 py-5">
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
          <Button
            onClick={() => {
              setDate({
                startDate: dayjs().toISOString(),
                endDate: dayjs().toISOString(),
              });
            }}
          >
            مسح الفلتر
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {transactions && (
          <CardDashboard
            title="إجمالي الإيرادات"
            value={`${transactions.totalPaidAmount} ج.م`}
            subtext={`المسترجع: ${transactions.totalRefundedAmount} ج.م`}
            icon={<RiMoneyDollarCircleLine />}
          />
        )}
        {clients && (
          <CardDashboard
            title="إجمالي العملاء"
            value={clients.totalClients}
            subtext={`${clients.subscribedClients} مشترك`}
            icon={<RiUserSearchFill />}
          />
        )}
        {lessons && (
          <CardDashboard
            title="إجمالي الحصص"
            value={lessons.totalLessons}
            subtext={`${lessons.completedLessons} مكتملة`}
            icon={<RiBookOpenLine />}
          />
        )}
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
          العملاء والحصص
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartPieLabel
            title="مصدر العملاء"
            description="عملاء المكتب مقابل عملاء الموقع"
            chartData={
              clients
                ? [
                    {
                      label: "المكتب",
                      value: clients.officeClients,
                      fill: "var(--chart-1)",
                    },
                    {
                      label: "الموقع",
                      value: clients.platformClients,
                      fill: "var(--chart-2)",
                    },
                  ]
                : []
            }
          />
          <ChartPieLabel
            title="نوع الحصص"
            description="مانيوال مقابل أوتوماتيك"
            chartData={
              lessons
                ? [
                    {
                      label: "مانيوال",
                      value: lessons.manualLessons,
                      fill: "var(--chart-3)",
                    },
                    {
                      label: "أوتوماتيك",
                      value: lessons.automaticLessons,
                      fill: "var(--chart-4)",
                    },
                  ]
                : []
            }
          />
        </div>
      </div>

      {/* Section: الإحصائيات المالية */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
          الإحصائيات المالية والاشتراكات
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartBarLabel
            title="حالة الاشتراكات"
            description="المشتركين مقابل غير المشتركين"
            chartData={
              clients
                ? [
                    {
                      label: "مشتركين",
                      value: clients.subscribedClients,
                      fill: "var(--chart-1)",
                    },
                    {
                      label: "غير مشتركين",
                      value: clients.nonSubscribedClients,
                      fill: "var(--chart-2)",
                    },
                  ]
                : []
            }
          />
          <ChartBarLabel
            title="الحركة المالية"
            description="المدفوعات والاسترجاعات"
            chartData={
              transactions
                ? [
                    {
                      label: "مدفوع",
                      value: transactions.totalPaidAmount,
                      fill: "var(--chart-3)",
                    },
                    {
                      label: "مسترجع",
                      value: transactions.totalRefundedAmount,
                      fill: "var(--chart-4)",
                    },
                  ]
                : []
            }
          />
        </div>
      </div>

      {/* Section: الحصص والكورسات */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
          الحصص والكورسات
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartBarLabel
            title="حالة الحصص"
            description="توزيع الحصص حسب الحالة"
            chartData={
              lessons
                ? [
                    {
                      label: "مكتملة",
                      value: lessons.completedLessons,
                      fill: "var(--chart-1)",
                    },
                    {
                      label: "مجدولة",
                      value: lessons.scheduledLessons,
                      fill: "var(--chart-2)",
                    },
                    {
                      label: "ملغية",
                      value: lessons.canceledLessons,
                      fill: "var(--chart-3)",
                    },
                    {
                      label: "ملغية برسوم",
                      value: lessons.canceledChargedLessons,
                      fill: "var(--chart-4)",
                    },
                  ]
                : []
            }
          />
          <ChartBarLabel
            title="اشتراكات الكورسات"
            description="عدد المشتركين في كل كورس"
            chartData={
              courses
                ? courses.courses.map((course, index) => ({
                    label: course.name,
                    value: course.subsCount,
                    fill: `var(--chart-${(index % 5) + 1})`,
                  }))
                : []
            }
          />
        </div>
      </div>
    </section>
  );
}
