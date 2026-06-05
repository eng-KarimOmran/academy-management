import { Button } from "@/components/ui/button";
import AddCaptain from "@/Routes/Captain/Forms/AddCaptain";
import AddSecretary from "@/Routes/Secretary/Forms/AddSecretary";
import { useDialogState } from "@/store/DialogState";
import { RiCarLine, RiUserAddLine, RiUserStarFill } from "@remixicon/react";
import CaptainCard from "./CaptainCard";
import type { UserProfile } from "@/types/user";

type UserActionType = "addCaptain" | "addSecretary";

export default function JobProfile({ user }: { user: UserProfile }) {
  const { captainProfile, secretaryProfile, phone } = user;
  const hasProfile = captainProfile ?? secretaryProfile ?? false;

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
          children: <AddSecretary phone={phone} />,
        });
        break;
    }
  };

  if (hasProfile === captainProfile) {
    return <CaptainCard captain={captainProfile} />;
  } else if (hasProfile === secretaryProfile) {
    return <>s</>;
  } else {
    return (
      <section className="border border-dotted p-6 bg-primary/10 flex flex-col justify-center items-center space-y-3">
        <span className="text-primary bg-primary/5 size-16 flex items-center justify-center rounded-full">
          <RiUserAddLine size={40} />
        </span>
        <h4>اضافة ملف وظيفي</h4>
        <p className="text-sm text-zinc-500">
          هذا المستخدم لا يملك ملفاً وظيفياً حالياً.
        </p>
        <div className="w-full grid grid-cols-2 gap-4">
          <Button onClick={() => handleUserAction("addCaptain")}>
            <RiCarLine />
            إضافة ملف كابتن
          </Button>
          <Button onClick={() => handleUserAction("addSecretary")}>
            <RiUserStarFill />
            إضافة ملف سكرتيرة
          </Button>
        </div>
      </section>
    );
  }
}
