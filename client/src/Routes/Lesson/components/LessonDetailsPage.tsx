import CardArray from "@/components/CardArray/CardArray";
import ShowMore from "@/components/ShowMore/ShowMore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import { getLessonDetails } from "@/service/lesson.service";
import {
  RiBankLine,
  RiCarLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiUserSmileLine,
  RiUserStarLine,
  RiWhatsappLine,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function LessonDetailsPage() {
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const academyId = searchParams.get("academyId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["lessons", academyId, lessonId],
    queryFn: () =>
      getLessonDetails({
        academyId: academyId!,
        lessonId: lessonId!,
      }),
    select: (res) => res.data.data,
    enabled: !!academyId && !!lessonId,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل الحصة");
    }
  }, [error]);

  if (!academyId || !lessonId) {
    return <Navigate to={"/dashboard/lesson"} />;
  }

  if (isLoading) {
    return <p> جاري تحميل البيانات...</p>;
  }

  if (!data) {
    return <p>لا يوجد بيانات لعرضها</p>;
  }

  const badgeVariant =
    data.status === "COMPLETED"
      ? "success"
      : data.status === "SCHEDULED"
        ? "warning"
        : "destructive";

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-center bg-muted p-5 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold">تفاصيل الحصة</h1>
        <div className="flex flex-col gap-2">
          <Badge
            className="w-full py-4 rounded-lg font-bold text-md"
            variant={badgeVariant}
          >
            {enumTranslations[data.status]}
          </Badge>
          <Button asChild>
            <Link
              to={`/dashboard/subscription/${data.subscriptionId}?academyId=${data.academy.id}`}
            >
              تفاصيل الأشتراك
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardArray
          title="معلومات الحصة والمنطقة"
          icon={<RiTimeLine />}
          data={[
            { label: "وقت البدء", val: formatDate(data.startTime) },
            { label: "وقت الانتهاء", val: formatDate(data.endTime) },
            {
              label: "ناقل الحركة",
              val: enumTranslations[data.transmission],
            },
            { label: "المنطقة", val: data.area.name },
          ]}
        />

        <CardArray
          title="بيانات العميل"
          icon={<RiUserSmileLine />}
          data={[
            { label: "الاسم", val: data.client?.name },
            {
              label: "واتساب",
              val: (
                <Button variant={"secondary"} asChild>
                  <a
                    href={`https://wa.me/+2${data.client.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiWhatsappLine />
                    واتساب
                  </a>
                </Button>
              ),
            },
            {
              label: "تفاصيل العميل",
              val: (
                <Button variant={"secondary"} asChild>
                  <Link
                    to={`/dashboard/client/${data.client.id}?academyId=${data.academy.id}`}
                  >
                    ملف العميل
                  </Link>
                </Button>
              ),
            },
            {
              label: "رقم الهاتف",
              val: (
                <Button variant={"secondary"} asChild>
                  <a href={`tel:${data.client.phone}`}>{data.client.phone}</a>
                </Button>
              ),
            },
          ]}
        />

        <CardArray
          title="بيانات الكابتن"
          icon={<RiUserStarLine />}
          data={[
            { label: "الاسم", val: data.captain.user.name },
            {
              label: "تكلفة الكابتن",
              val: `${data.captainLessonPrice} ج.م`,
            },
            {
              label: "واتساب",
              val: (
                <Button variant={"secondary"} asChild>
                  <a
                    href={`https://wa.me/+2${data.captain.user.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiWhatsappLine />
                    واتساب
                  </a>
                </Button>
              ),
            },
            {
              label: "رقم الهاتف",
              val: (
                <Button variant={"secondary"} asChild>
                  <a href={`tel:${data.captain.user.phone}`}>
                    {data.captain.user.phone}
                  </a>
                </Button>
              ),
            },
          ]}
        />

        <CardArray
          title="بيانات السيارة"
          icon={<RiCarLine />}
          data={[
            { label: "الموديل", val: data.car.modelName },
            { label: "رقم اللوحة", val: data.car.plateNumber },
            { label: "نوع الناقل", val: enumTranslations[data.car.gearType] },
            {
              label: "تكلفة السيارة",
              val: `${data.carSessionPrice} ج.م`,
            },
          ]}
        />

        <CardArray
          title="التفاصيل المالية"
          icon={<RiMoneyDollarCircleLine />}
          data={[
            {
              label: "المبلغ المتوقع",
              val: data.expectedAmount
                ? `${data.expectedAmount} ج.م`
                : "لا توجد رسوم مطلوبة",
            },

            {
              label: "المبلغ المدفوع",
              val: data.paymentTransaction
                ? `${data.paymentTransaction.amount} ج.م`
                : "---",
            },
            {
              label: "طريقة الدفع",
              val: data.paymentTransaction
                ? enumTranslations[data.paymentTransaction.paymentMethod]
                : "---",
            },
            {
              label: "حالة الدفع",
              val: data.paymentTransaction
                ? enumTranslations[data.paymentTransaction.status]
                : "---",
            },
          ]}
        />

        <CardArray
          title="الأكاديمية"
          icon={<RiBankLine />}
          data={[
            { label: "الاسم", val: data.academy.name },
            { label: "رقم الهاتف", val: data.academy.phone },
            {
              label: "العنوان",
              val: <ShowMore text={data.academy.address} columns={2} />,
            },
            {
              label: "InstaPay",
              val: <ShowMore text={data.academy.instaPay} columns={2} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
