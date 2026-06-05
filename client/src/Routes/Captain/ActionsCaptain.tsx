import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import {
  RiDeleteBin6Line,
  RiEditLine,
  type RemixiconComponentType,
} from "@remixicon/react";

import type { Captain } from "@/types/captain";

import UpdateCaptain from "./Forms/UpdateCaptain";
import DeleteCaptain from "./Forms/DeleteCaptain";
import { useDialogState } from "@/store/DialogState";

type ActionType = "update" | "delete";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsCaptain({ item }: { item: Captain }) {
  const { setConfigDialog } = useDialogState();

  const actions: Action[] = [
    { title: "تعديل", icon: RiEditLine, type: "update" },
    { title: "حذف", icon: RiDeleteBin6Line, type: "delete" },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "update":
        setConfigDialog({
          title: "تعديل الكابتن",
          description: "قم بتعديل البيانات ثم اضغط حفظ.",
          children: <UpdateCaptain item={item} />,
        });
        break;

      case "delete":
        setConfigDialog({
          title: "حذف الكابتن",
          description: "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
          children: <DeleteCaptain item={item} />,
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
