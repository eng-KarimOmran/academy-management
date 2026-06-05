import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  RiDeleteBin6Line,
  RiEditLine,
  RiUserLine,
  RiFileListLine,
  type RemixiconComponentType,
} from "@remixicon/react";

import { useNavigate } from "react-router-dom";

import UpdateTransaction from "./Forms/UpdateTransaction";
import DeleteTransaction from "./Forms/DeleteTransaction";

import type { Payment } from "@/types/transaction";
import { useDialogState } from "@/store/DialogState";

type ActionType = "update" | "delete" | "client" | "subscription";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsTransaction({ item }: { item: Payment }) {
  const navigate = useNavigate();
  const { setConfigDialog } = useDialogState();

  const actions: Action[] = [
    { title: "تعديل", icon: RiEditLine, type: "update" },
    { title: "حذف", icon: RiDeleteBin6Line, type: "delete" },

    { title: "عرض العميل", icon: RiUserLine, type: "client" },

    { title: "عرض الاشتراك", icon: RiFileListLine, type: "subscription" },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "update":
        setConfigDialog({
          title: "تعديل المعاملة",
          description: "قم بتعديل بيانات المعاملة ثم اضغط حفظ.",
          children: <UpdateTransaction item={item} />,
        });
        break;

      case "delete":
        setConfigDialog({
          title: "حذف المعاملة",
          description: "هل أنت متأكد؟ لا يمكن التراجع.",
          children: <DeleteTransaction item={item} />,
        });
        break;

      case "client":
        navigate(
          `/dashboard/client/${item.subscription.client.id}?academyId=${item.academy.id}`,
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
