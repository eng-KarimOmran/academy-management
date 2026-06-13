import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { Academy } from "@/types/academy";
import {
  RiDeleteBin6Line,
  RiEditLine,
  RiExternalLinkLine,
  type RemixiconComponentType,
} from "@remixicon/react";

import Update from "./Forms/UpdateAcademy";
import Delete from "./Forms/DeleteAcademy";
import { useNavigate } from "react-router-dom";
import { useDialogState } from "@/store/DialogState";

type ActionType = "update" | "delete" | "details";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsAcademy({ item }: { item: Academy }) {
  const { setConfigDialog } = useDialogState();
  const navigate = useNavigate();

  const actions: Action[] = [
    { title: "التفاصيل", icon: RiExternalLinkLine, type: "details" },
    { title: "تعديل", icon: RiEditLine, type: "update" },
    { title: "حذف", icon: RiDeleteBin6Line, type: "delete" },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "details":
        navigate(`/dashboard/academy/${item.id}`);
        break;
      case "update":
        setConfigDialog({
          title: "تعديل بيانات الأكاديمية",
          description: "قم بتعديل البيانات المطلوبة ثم اضغط حفظ.",
          children: <Update item={item} />,
        });
        break;
      case "delete":
        setConfigDialog({
          title: "حذف الأكاديمية",
          description: "هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.",
          children: <Delete item={item} />,
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
