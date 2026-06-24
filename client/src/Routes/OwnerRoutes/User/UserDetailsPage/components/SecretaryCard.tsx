import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useDialogState } from "@/store/DialogState";
import UpdateSecretary from "@/Routes/OwnerRoutes/Secretary/Forms/UpdateSecretary";
import DeleteSecretary from "@/Routes/OwnerRoutes/Secretary/Forms/DeleteSecretary";
import type { UserProfile } from "@/types/user";
import {
  RiEditLine,
  RiDeleteBin6Line,
  RiCalendarLine,
  RiUserStarFill,
  RiCoinsLine,
  RiFocus3Line,
  RiGiftLine,
} from "@remixicon/react";

export default function SecretaryCard({
  secretary,
}: {
  secretary: UserProfile["secretaryProfile"];
}) {
  const { setConfigDialog } = useDialogState();

  if (!secretary) {
    return (
      <Card className="border-dashed p-6 text-center text-muted-foreground">
        لا تتوفر بيانات ملف السكرتارية.
      </Card>
    );
  }

  const handleAction = (action: "update" | "delete") => {
    setConfigDialog(
      action === "update"
        ? {
            title: "تعديل بيانات السكرتارية",
            description:
              "قم بتعديل البيانات المطلوبة ثم اضغط على حفظ التعديلات.",
            children: <UpdateSecretary item={secretary} />,
          }
        : {
            title: "حذف ملف السكرتارية",
            description:
              "هل أنت متأكد من حذف هذا الملف؟ هذا الإجراء لا يمكن التراجع عنه.",
            children: <DeleteSecretary item={secretary} />,
          },
    );
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 border bg-card overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-muted/10 border-b">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <RiUserStarFill className="text-primary size-5" />
          بيانات ملف السكرتارية
        </CardTitle>

        <Badge
          variant="default"
          className="px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-600 hover:bg-blue-500/10 border-blue-500/20"
        >
          ملف نشط
        </Badge>
      </CardHeader>

      <CardContent className="p-5 space-y-4 pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border bg-muted/20 p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <RiCoinsLine size={16} className="text-amber-500" />
              <span className="text-xs font-medium">الراتب الأساسي</span>
            </div>
            <p className="font-bold text-base text-foreground tracking-tight">
              {secretary.baseSalary}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                ج.م
              </span>
            </p>
          </div>

          <div className="rounded-xl border bg-muted/20 p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <RiFocus3Line size={16} className="text-blue-500" />
              <span className="text-xs font-medium">المستهدف (Target)</span>
            </div>
            <p className="font-bold text-base text-foreground tracking-tight">
              {secretary.targetCount}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                حصة
              </span>
            </p>
          </div>

          <div className="rounded-xl border bg-muted/20 p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <RiGiftLine size={16} className="text-green-500" />
              <span className="text-xs font-medium">قيمة المكافأة</span>
            </div>
            <p className="font-bold text-base text-foreground tracking-tight">
              {secretary.bonusAmount}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                ج.م
              </span>
            </p>
          </div>
        </div>

        {secretary.createdAt && (
          <div className="rounded-xl border bg-muted/10 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <RiCalendarLine size={16} />
              <span>تاريخ التعيين في الدور</span>
            </div>
            <p className="font-medium text-sm text-foreground">
              {formatDate(secretary.createdAt)}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t mt-2">
          <Button
            variant="outline"
            className="flex-1 gap-1.5 h-9 text-sm font-medium"
            onClick={() => handleAction("update")}
          >
            <RiEditLine size={16} />
            تعديل البيانات
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
