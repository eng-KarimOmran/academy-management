import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  RiEditLine,
  RiUserLine,
  RiFileListLine,
  type RemixiconComponentType,
  RiWalletLine,
} from "@remixicon/react";

import { useNavigate } from "react-router-dom";

import UpdateTransaction from "./Forms/UpdateTransaction";

import type { Payment } from "@/types/transaction";
import { useDialogState } from "@/store/DialogState";

type ActionType = "update" | "client" | "subscription" | "details";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsTransaction({ item }: { item: Payment }) {
  const navigate = useNavigate();
  const { setConfigDialog } = useDialogState();

  const actions: Action[] = [
    { title: "تغير الحالة", icon: RiEditLine, type: "update" },
    {
      title: "عرض المعاملة",
      icon: RiWalletLine,
      type: "details",
    },
    { title: "عرض العميل", icon: RiUserLine, type: "client" },
    { title: "عرض الاشتراك", icon: RiFileListLine, type: "subscription" },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "update":
        setConfigDialog({
          title: "تغير حالة المعاملة",
          description: "قم بتعديل حالة المعاملة ثم اضغط حفظ.",
          children: <UpdateTransaction item={item} />,
        });
        break;
      case "details":
        navigate(
          `/dashboard/transactions/${item.id}?academyId=${item.academy.id}`,
        );
        break;
      case "client":
        navigate(
          `/dashboard/client/${item.client.id}?academyId=${item.academy.id}`,
        );
        break;
      case "subscription":
        navigate(
          `/dashboard/subscription/${item.subscription.id}?academyId=${item.academy.id}`,
        );
        break;
    }
  };

  return (
    <>
      {actions.map((action, index) => {
        return (
          <div key={action.type}>
            {index === 2 && <DropdownMenuSeparator />}

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleAction(action.type);
              }}
            >
              <action.icon className="ml-2 h-4 w-4" />
              <span>{action.title}</span>
            </DropdownMenuItem>
          </div>
        );
      })}
    </>
  );
}
