import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  RiDeleteBin6Line,
  RiEditLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import type { Area } from "@/types/area";
import UpdateArea from "./Forms/UpdateArea";
import DeleteArea from "./Forms/DeleteArea";
import { useDialogState } from "@/store/DialogState";

type ActionType = "update" | "delete";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsArea({ item }: { item: Area }) {
  const { setConfigDialog } = useDialogState();

  const actions: Action[] = [
    { title: "تعديل", icon: RiEditLine, type: "update" },
    { title: "حذف", icon: RiDeleteBin6Line, type: "delete" },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "update":
        setConfigDialog({
          title: "تعديل المنطقة",
          description: "قم بتعديل البيانات ثم اضغط حفظ.",
          children: <UpdateArea item={item} />,
        });
        break;

      case "delete":
        setConfigDialog({
          title: "حذف المنطقة",
          description: "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
          children: <DeleteArea item={item} />,
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
