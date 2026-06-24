import { Button } from "@/components/ui/button";
import AddCaptain from "@/Routes/OwnerRoutes/Captain/Forms/AddCaptain";
import AddSecretary from "@/Routes/OwnerRoutes/Secretary/Forms/AddSecretary";
import { useDialogState } from "@/store/DialogState";
import { RiCarLine, RiUserAddLine, RiUserStarFill } from "@remixicon/react";
import CaptainCard from "./CaptainCard";
import SecretaryCard from "./SecretaryCard";
import type { UserProfile } from "@/types/user";

type UserActionType = "addCaptain" | "addSecretary";

export default function JobProfile({ user }: { user: UserProfile }) {
  const { id, name, captainProfile, secretaryProfile, phone } = user;
  const { setConfigDialog } = useDialogState();

  const handleUserAction = (type: UserActionType) => {
    switch (type) {
      case "addCaptain":
        setConfigDialog({
          title: "إضافة كابتن جديد",
          description: "قم بإدخال بيانات الكابتن الجديد.",
          children: <AddCaptain phone={phone} />,
        });
        break;

      case "addSecretary":
        setConfigDialog({
          title: "إضافة سكرتير جديد",
          description: "قم بإدخال بيانات السكرتير الجديد.",
          children: <AddSecretary user={{ name, phone, userId: id }} />,
        });
        break;
    }
  };

  const hasAnyProfile = !!captainProfile || !!secretaryProfile;

  if (!hasAnyProfile) {
    return (
      <section className="rounded-xl border-2 border-dashed border-muted-foreground/20 p-8 bg-muted/30 flex flex-col justify-center items-center text-center space-y-4 transition-all hover:bg-muted/40">
        <div className="text-primary bg-primary/10 size-14 flex items-center justify-center rounded-full shadow-sm animate-pulse">
          <RiUserAddLine size={28} />
        </div>

        <div className="space-y-1">
          <h4 className="font-bold text-lg text-foreground">إضافة ملف وظيفي</h4>
          <p className="text-sm text-muted-foreground max-w-sm">
            هذا المستخدم لا يملك ملفاً وظيفياً حالياً. يمكنك تعيين دور له ككابتن
            أو سكرتارية.
          </p>
        </div>

        <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => handleUserAction("addCaptain")}
            className="gap-2 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <RiCarLine size={18} />
            إضافة ملف كابتن
          </Button>

          <Button
            variant="outline"
            onClick={() => handleUserAction("addSecretary")}
            className="gap-2 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <RiUserStarFill size={18} />
            إضافة ملف سكرتيرة
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 items-stretch">
      {captainProfile ? (
        <CaptainCard captain={captainProfile} />
      ) : (
        <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 p-6 bg-muted/10 flex flex-col items-center justify-center text-center space-y-3 h-full min-h-55">
          <div className="p-3 bg-background rounded-full border text-muted-foreground shadow-sm">
            <RiCarLine size={24} />
          </div>
          <div className="space-y-1">
            <h5 className="font-semibold text-sm text-foreground">
              ملف كابتن غير معين
            </h5>
            <p className="text-xs text-muted-foreground max-w-50">
              هذا المستخدم لا يمتلك صلاحيات أو ملف كابتن قيادة حالياً.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleUserAction("addCaptain")}
            className="gap-1.5 text-xs"
          >
            <RiCarLine size={14} />
            إضافة ملف كابتن
          </Button>
        </div>
      )}

      {secretaryProfile ? (
        <SecretaryCard secretary={secretaryProfile} />
      ) : (
        <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 p-6 bg-muted/10 flex flex-col items-center justify-center text-center space-y-3 h-full min-h-55">
          <div className="p-3 bg-background rounded-full border text-muted-foreground shadow-sm">
            <RiUserStarFill size={24} />
          </div>
          <div className="space-y-1">
            <h5 className="font-semibold text-sm text-foreground">
              ملف سكرتارية غير معين
            </h5>
            <p className="text-xs text-muted-foreground max-w-50">
              هذا المستخدم لا يمتلك صلاحيات أو ملف سكرتارية حالياً.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleUserAction("addSecretary")}
            className="gap-1.5 text-xs"
          >
            <RiUserStarFill size={14} />
            إضافة ملف سكرتيرة
          </Button>
        </div>
      )}
    </div>
  );
}
