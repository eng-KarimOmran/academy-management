import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import {
  RiDeleteBin6Line,
  RiCloseCircleLine,
  RiFileList3Line,
  RiUser3Line,
  RiWhatsappLine,
  type RemixiconComponentType,
} from "@remixicon/react";

import { useNavigate } from "react-router-dom";

import type { SubscriptionBase } from "@/types/subscription";

import CancelSubscription from "./Forms/CancelSubscription";
import DeleteSubscription from "./Forms/DeleteSubscription";
import { useDialogState } from "@/store/DialogState";

type ActionType = "details" | "client" | "whatsapp" | "cancel" | "delete";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsSubscription({
  item,
}: {
  item: SubscriptionBase;
}) {
  const navigate = useNavigate();
  const { setConfigDialog } = useDialogState();

  const actions: Action[] = [
    {
      title: "تفاصيل الاشتراك",
      icon: RiFileList3Line,
      type: "details",
    },
    {
      title: "بيانات العميل",
      icon: RiUser3Line,
      type: "client",
    },
    {
      title: "واتساب",
      icon: RiWhatsappLine,
      type: "whatsapp",
    },
    {
      title: "إلغاء الاشتراك",
      icon: RiCloseCircleLine,
      type: "cancel",
    },
    {
      title: "حذف",
      icon: RiDeleteBin6Line,
      type: "delete",
    },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "details":
        navigate(
          `/dashboard/subscription/${item.id}?academyId=${item.academy.id}`,
        );
        break;
      case "client":
        navigate(
          `/dashboard/client/${item.client.id}?academyId=${item.academy.id}`,
        );
        break;
      case "whatsapp":
        window.open(`https://wa.me/2${item.client.phone}`, "_blank");
        break;
      case "cancel":
        setConfigDialog({
          title: "إلغاء الاشتراك",
          description: "لا يمكن الرجوع فى هذا",
          children: <CancelSubscription item={item} />,
        });
        break;
      case "delete":
        setConfigDialog({
          title: "حذف الاشتراك",
          description: "هل أنت متأكد من حذف الاشتراك؟ لا يمكن التراجع.",
          children: <DeleteSubscription item={item} />,
        });
        break;
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
        >
          <action.icon className="ml-2 h-4 w-4" />
          <span>{action.title}</span>
        </DropdownMenuItem>
      ))}
    </>
  );
}
