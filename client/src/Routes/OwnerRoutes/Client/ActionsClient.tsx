import { useNavigate } from "react-router-dom";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import {
  RiDeleteBin6Line,
  RiEditLine,
  RiPhoneLine,
  RiUser3Line,
  RiWhatsappLine,
  type RemixiconComponentType,
} from "@remixicon/react";


import type { Client } from "@/types/client";

import UpdateClient from "./Forms/UpdateClient";
import DeleteClient from "./Forms/DeleteClient";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import { useDialogState } from "@/store/DialogState";

type ActionType = "update" | "delete" | "details" | "whatsapp" | "phone-call";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
  isDisabled?: boolean;
}

export default function ActionsClient({ item }: { item: Client }) {
  const navigate = useNavigate();
  const { activeAcademy } = useActiveAcademyState();

  const { setConfigDialog } = useDialogState();

  const actions: Action[] = [
    {
      title: "مكالمة هاتفية",
      icon: RiPhoneLine,
      type: "phone-call",
    },
    {
      title: "واتساب",
      icon: RiWhatsappLine,
      type: "whatsapp",
    },
    {
      title: "التفاصيل",
      icon: RiUser3Line,
      type: "details",
    },
    {
      title: "تعديل",
      icon: RiEditLine,
      type: "update",
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
          `/dashboard/client/${item.id}?academyId=${activeAcademy?.id ?? ""}`,
        );
        break;
      case "update":
        setConfigDialog({
          title: "تعديل العميل",
          description: "قم بتعديل بيانات العميل ثم اضغط حفظ.",
          children: <UpdateClient item={item} />,
        });

        break;
      case "delete":
        setConfigDialog({
          title: "حذف العميل",
          description: "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
          children: <DeleteClient item={item} />,
        });

        break;
      case "whatsapp":
        window.open(`https://wa.me/+2${item.phone}`, "_blank");
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
