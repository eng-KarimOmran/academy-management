import CardArray from "@/components/CardArray/CardArray";
import { BadgeDemo } from "@/components/CustomBadge/CustomBadge";
import { Button } from "@/components/ui/button";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import { getLessonDetails } from "@/service/lesson.service";
import { useDialogState } from "@/store/DialogState";
import {
  RiCarLine,
  RiTimeLine,
  RiUserSmileLine,
  RiUserStarLine,
  RiWhatsappLine,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import ChangeLesson from "../Forms/ChangeLesson";
import UpdateLesson from "../Forms/UpdateLesson";

export default function LessonDetailsPage() {
  const { setConfigDialog } = useDialogState();

  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const academyId = searchParams.get("academyId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["lessons", academyId, lessonId],
    queryFn: () =>
      getLessonDetails({
        params: {
          academyId: academyId!,
          lessonId: lessonId!,
        },
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
    return <Navigate to={"/not-found"} />;
  }

  if (isLoading) {
    return <p> جاري تحميل البيانات...</p>;
  }

  if (!data) {
    return <p>لا يوجد بيانات لعرضها</p>;
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <header className="bg-muted p-5 rounded-xl shadow-sm border space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">تفاصيل الحصة</h2>
          <BadgeDemo type={data.status} text={enumTranslations[data.status]} />
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            disabled={["COMPLETED", "CANCELED_CHARGED"].includes(data.status)}
            variant="outline"
            onClick={() => {
              setConfigDialog({
                title: "تعديل الحصة",
                description: "قم بتغيير بيانات الحصة",
                children: <UpdateLesson item={data} />,
              });
            }}
          >
            تعديل
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setConfigDialog({
                title: "تحديث حالة الحصة",
                description: "قم بتغيير حالة الحصة",
                children: <ChangeLesson item={data} />,
              });
            }}
          >
            تغيير الحالة
          </Button>
          <Button asChild>
            <Link
              to={`/dashboard/subscription/${data.subscriptionId}?academyId=${data.academy.id}`}
            >
              تفاصيل الأشتراك
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              label: "سعر حصة الكابتن",
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
            {
              label: "التكلفة التشغلية للسيارة",
              val: `${data.carSessionPrice} ج.م`,
            },
          ]}
        />
      </div>
    </div>
  );
}
