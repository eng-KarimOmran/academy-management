import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import {
  RiExternalLinkLine,
  RiCheckDoubleLine,
  type RemixiconComponentType,
  RiFileList3Line,
  RiUser3Line,
} from "@remixicon/react";

import type { LessonBase } from "@/types/lesson";
import { useNavigate } from "react-router-dom";
import { useDialogState } from "@/store/DialogState";
import ChangeLesson from "./Forms/ChangeLesson";

type ActionType = "details" | "changeState" | "client" | "subscriptionDetails";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsLesson({
  item,
  academyId,
}: {
  item: LessonBase;
  academyId: string;
}) {
  const { setConfigDialog } = useDialogState();

  const navigate = useNavigate();

  const actions: Action[] = [
    { title: "التفاصيل", icon: RiExternalLinkLine, type: "details" },
    { title: "تحديث الحالة", icon: RiCheckDoubleLine, type: "changeState" },
    {
      title: "تفاصيل الاشتراك",
      icon: RiFileList3Line,
      type: "subscriptionDetails",
    },
    {
      title: "بيانات العميل",
      icon: RiUser3Line,
      type: "client",
    },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "details":
        navigate(`/dashboard/lesson/${item.id}?academyId=${academyId}`);
        break;

      case "changeState":
        setConfigDialog({
          title: "تحديث حالة الحصة",
          description:
            "قم بتغيير حالة الحصة (مكتملة، ملغاة) وإضافة تفاصيل الدفع.",
          children: <ChangeLesson item={item} />,
        });
        break;

      case "client":
        navigate(
          `/dashboard/client/${item.client.id}?academyId=${item.academy.id}`,
        );
        break;

      case "subscriptionDetails":
        navigate(
          `/dashboard/subscription/${item.subscriptionId}?academyId=${item.academy.id}`,
        );
    }
  };

  return (
    <>
      {actions.map((action) => (
        <DropdownMenuItem
          key={action.type}
          onSelect={(e) => {
            e.preventDefault();
            handleAction(action.type);
          }}
          disabled={!academyId}
        >
          <action.icon className="ml-2 h-4 w-4" />
          <span>{action.title}</span>
        </DropdownMenuItem>
      ))}
    </>
  );
}
