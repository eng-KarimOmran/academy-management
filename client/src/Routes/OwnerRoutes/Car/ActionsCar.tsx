import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import {
  RiDeleteBin6Line,
  RiEditLine,
  type RemixiconComponentType,
} from "@remixicon/react";

import type { Car } from "@/types/car";

import UpdateCar from "./Forms/UpdateCar";
import DeleteCar from "./Forms/DeleteCar";
import { useDialogState } from "@/store/DialogState";

type ActionType = "update" | "delete";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsCar({ item }: { item: Car }) {
  const { setConfigDialog } = useDialogState();

  const actions: Action[] = [
    { title: "تعديل", icon: RiEditLine, type: "update" },
    { title: "حذف", icon: RiDeleteBin6Line, type: "delete" },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "update":
        setConfigDialog({
          title: "تعديل السيارة",
          description: "قم بتعديل بيانات السيارة ثم اضغط حفظ.",
          children: <UpdateCar item={item} />,
        });
        break;

      case "delete":
        setConfigDialog({
          title: "حذف السيارة",
          description: "هل أنت متأكد من حذف السيارة؟ لا يمكن التراجع.",
          children: <DeleteCar item={item} />,
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
