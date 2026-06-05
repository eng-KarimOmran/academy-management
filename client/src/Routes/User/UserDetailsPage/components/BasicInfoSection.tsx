import CopyBtn from "@/components/CopyBtn/CopyBtn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { enumTranslations } from "@/lib/enumTranslations";
import { useDialogState } from "@/store/DialogState";
import type { User } from "@/types/user";
import { RiPhoneLine, RiWhatsappLine } from "@remixicon/react";
import UpdateUser from "../../Forms/UpdateUser";
import DeleteUser from "../../Forms/DeleteUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userImg from "../../../../assets/user.png";
import { formatDate } from "@/lib/utils";
import dayjs from "dayjs";

type UserActionType = "update" | "delete" | "whatsapp" | "call";

export default function BasicInfoSection({
  user,
  createdAt,
}: {
  user: User;
  createdAt: string;
}) {
  const { name, phone, status } = user;
  const { setConfigDialog } = useDialogState();

  const daysSinceJoin = dayjs().diff(dayjs(createdAt), "day");

  const handleUserAction = (type: UserActionType) => {
    switch (type) {
      case "update":
        setConfigDialog({
          title: "تعديل المستخدم",
          description: "قم بتعديل بيانات المستخدم ثم اضغط حفظ.",
          children: <UpdateUser item={user} />,
        });
        break;

      case "delete":
        setConfigDialog({
          title: "حذف المستخدم",
          description: "هل أنت متأكد من حذف المستخدم؟ لا يمكن التراجع.",
          children: <DeleteUser item={user} />,
        });
        break;

      case "whatsapp":
        if (phone) {
          window.open(`https://wa.me/${phone}`, "_blank");
        }
        break;

      case "call":
        if (phone) {
          window.open(`tel:${phone}`, "_self");
        }
        break;
    }
  };

  return (
    <section className="space-y-4">
      <div className="bg-card rounded-xl border shadow-sm p-3 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-3">
            <Avatar className="size-12 border-4 border-white shadow-lg flex justify-center items-center text-2xl">
              <AvatarImage src={userImg} />
              <AvatarFallback className="text-3xl bg-primary/10 text-primary font-bold">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              {name}
            </h1>

            <Badge variant={status === "ACTIVE" ? "success" : "destructive"}>
              {enumTranslations[status] || status}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            معلومات المستخدم الأساسية
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone Card */}
          <div className="rounded-xl border bg-muted/30 p-4 space-y-4">
            <div className="text-xs text-muted-foreground font-medium">
              الهاتف
            </div>

            <div className="flex items-center justify-between">
              <span className="font-mono font-semibold" dir="ltr">
                {phone}
              </span>

              <CopyBtn text={phone} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => handleUserAction("whatsapp")}
              >
                <RiWhatsappLine className="text-green-600" />
                واتساب
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => handleUserAction("call")}
              >
                <RiPhoneLine className="text-blue-600" />
                اتصال
              </Button>
            </div>
          </div>

          {/* Join Date Card */}
          <div className="rounded-xl border bg-muted/30 p-4 space-y-2">
            <div className="text-xs text-muted-foreground font-medium">
              تاريخ الانضمام
            </div>

            <div className="font-semibold text-sm space-y-1">
              <div>{formatDate(createdAt)}</div>

              <div className="text-xs text-muted-foreground">
                منذ {daysSinceJoin} يوم
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            className="flex-1 md:flex-none"
            onClick={() => handleUserAction("update")}
          >
            تعديل
          </Button>

          <Button
            variant="destructive"
            className="flex-1 md:flex-none"
            onClick={() => handleUserAction("delete")}
          >
            حذف
          </Button>
        </div>
      </div>
    </section>
  );
}
