import type { CaptainBass } from "@/types/captain";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import { useDialogState } from "@/store/DialogState";
import UpdateCaptain from "@/Routes/Captain/Forms/UpdateCaptain";
import DeleteCaptain from "@/Routes/Captain/Forms/DeleteCaptain";

interface CaptainCardProps {
  captain: CaptainBass;
}

export default function CaptainCard({ captain }: CaptainCardProps) {
  const { setConfigDialog } = useDialogState();

  const handleAction = (action: "update" | "delete") => {
    setConfigDialog(
      action === "update"
        ? {
            title: "تعديل الكابتن",
            description: "قم بتعديل البيانات ثم اضغط حفظ.",
            children: <UpdateCaptain item={captain} />,
          }
        : {
            title: "حذف الكابتن",
            description: "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
            children: <DeleteCaptain item={captain} />,
          },
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="px-5 space-y-4">
        {/* Header Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">حالة الكابتن</span>

          <Badge
            variant={captain.isActive ? "success" : "destructive"}
            className="px-3 py-1"
          >
            {captain.isActive ? "نشط" : "غير نشط"}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground mb-1">سعر الحصة</p>
            <p className="font-bold text-primary">
              {captain.captainLessonPrice} ج.م
            </p>
          </div>

          <div className="rounded-xl bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground mb-1">نوع التدريب</p>
            <p className="font-semibold">
              {enumTranslations[captain.trainingType] || captain.trainingType}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="rounded-xl bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground">تاريخ الانضمام</p>
          <p className="font-medium">{formatDate(captain.createdAt)}</p>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="secondary"
            onClick={() => handleAction("update")}
          >
            تعديل
          </Button>

          <Button
            variant="destructive"
            onClick={() => handleAction("delete")}
          >
            حذف
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
