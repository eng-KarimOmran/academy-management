import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  RiDeleteBin6Line,
  RiEditLine,
  RiExternalLinkLine,
  RiPhoneLine,
  RiWhatsappLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import type { User } from "@/types/user";

import UpdateUser from "./Forms/UpdateUser";
import DeleteUser from "./Forms/DeleteUser";
import { useDialogState } from "@/store/DialogState";
import { useNavigate } from "react-router-dom";

type ActionType = "update" | "delete" | "whatsapp" | "phone-call" | "details";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsUser({ item }: { item: User }) {
  const { setConfigDialog } = useDialogState();
  const navigate = useNavigate();

  const actions: Action[] = [
    {
      title: "مكالمة هاتفية",
      icon: RiPhoneLine,
      type: "phone-call",
    },
    { title: "واتساب", icon: RiWhatsappLine, type: "whatsapp" },
    { title: "التفاصيل", icon: RiExternalLinkLine, type: "details" },

    { title: "واتساب", icon: RiWhatsappLine, type: "whatsapp" },
    { title: "تعديل", icon: RiEditLine, type: "update" },
    { title: "حذف", icon: RiDeleteBin6Line, type: "delete" },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "update":
        setConfigDialog({
          title: "تعديل المستخدم",
          description: "قم بتعديل بيانات المستخدم ثم اضغط حفظ.",
          children: <UpdateUser item={item} />,
        });
        break;

      case "delete":
        setConfigDialog({
          title: "حذف المستخدم",
          description: "هل أنت متأكد من حذف المستخدم؟ لا يمكن التراجع.",
          children: <DeleteUser item={item} />,
        });
        break;
      case "whatsapp":
        window.open(`https://wa.me/${item.phone}`, "_blank");
        break;
      case "details":
        navigate(`/dashboard/user/${item.id}`);
        break;
      case "phone-call":
        window.open(`tel:${item.phone}`, "_blank");
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
