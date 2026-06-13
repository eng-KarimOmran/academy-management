import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import { useDialogState } from "@/store/DialogState";
import UpdateCaptain from "@/Routes/OwnerRoutes/Captain/Forms/UpdateCaptain";
import DeleteCaptain from "@/Routes/OwnerRoutes/Captain/Forms/DeleteCaptain";
import type { UserProfile } from "@/types/user";
import {
  RiEditLine,
  RiDeleteBin6Line,
  RiCalendarLine,
  RiPriceTag3Line,
  RiSteering2Line,
} from "@remixicon/react";

interface CaptainCardProps {
  captain: UserProfile["captainProfile"];
}

export default function CaptainCard({ captain }: CaptainCardProps) {
  const { setConfigDialog } = useDialogState();

  if (!captain) {
    return (
      <Card className="border-dashed p-6 text-center text-muted-foreground">
        لا تتوفر بيانات ملف الكابتن.
      </Card>
    );
  }

  const handleAction = (action: "update" | "delete") => {
    setConfigDialog(
      action === "update"
        ? {
            title: "تعديل بيانات الكابتن",
            description:
              "قم بتعديل البيانات المطلوبة ثم اضغط على حفظ التعديلات.",
            children: <UpdateCaptain item={captain} />,
          }
        : {
            title: "حذف ملف الكابتن",
            description:
              "هل أنت متأكد من حذف هذا الملف؟ هذا الإجراء لا يمكن التراجع عنه.",
            children: <DeleteCaptain item={captain} />,
          },
    );
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 border bg-card overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-muted/10 border-b">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <RiSteering2Line className="text-primary size-5 animate-spin-slow" />
          بيانات كابتن القيادة
        </CardTitle>

        <Badge
          variant={captain.isActive ? "default" : "destructive"}
          className={`px-2.5 py-0.5 text-xs font-medium ${
            captain.isActive
              ? "bg-green-500/10 text-green-600 hover:bg-green-500/10 border-green-500/20"
              : ""
          }`}
        >
          {captain.isActive ? "نشط" : "غير نشط"}
        </Badge>
      </CardHeader>

      <CardContent className="p-5 space-y-4 pt-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border bg-muted/20 p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <RiPriceTag3Line size={16} />
              <span className="text-xs font-medium">سعر الحصة</span>
            </div>
            <p className="font-bold text-lg text-foreground tracking-tight">
              {captain.captainLessonPrice}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                ج.م
              </span>
            </p>
          </div>

          <div className="rounded-xl border bg-muted/20 p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <RiSteering2Line size={16} />
              <span className="text-xs font-medium">نوع التدريب</span>
            </div>
            <p className="font-semibold text-sm text-foreground truncate">
              {enumTranslations[captain.trainingType] || captain.trainingType}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-muted/10 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <RiCalendarLine size={16} className="text-muted-foreground" />
            <span>تاريخ الانضمام</span>
          </div>
          <p className="font-medium text-sm text-foreground">
            {formatDate(captain.createdAt)}
          </p>
        </div>

        <div className="flex gap-2 pt-4 border-t mt-2">
          <Button
            variant="outline"
            className="flex-1 gap-1.5 h-9 text-sm font-medium"
            onClick={() => handleAction("update")}
          >
            <RiEditLine size={16} />
            تعديل
          </Button>

          <Button
            variant="destructive"
            className="flex-1 gap-1.5 h-9 text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive/20 transition-all"
            onClick={() => handleAction("delete")}
          >
            <RiDeleteBin6Line size={16} />
            حذف الملف
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}