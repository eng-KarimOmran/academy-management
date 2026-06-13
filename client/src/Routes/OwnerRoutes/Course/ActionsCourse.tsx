import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import {
  RiDeleteBin6Line,
  RiEditLine,
  RiExternalLinkLine,
  type RemixiconComponentType,
} from "@remixicon/react";

import type { Course } from "@/types/course";
import UpdateCourse from "./Forms/UpdateCourse";
import DeleteCourse from "./Forms/DeleteCourse";
import { useNavigate } from "react-router-dom";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import { useDialogState } from "@/store/DialogState";

type ActionType = "update" | "delete" | "details";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsCourse({
  item,
  academyId,
}: {
  item: Course;
  academyId?: string;
}) {
  const { setConfigDialog } = useDialogState();

  const navigate = useNavigate();
  const { activeAcademy } = useActiveAcademyState();

  const actions: Action[] = [
    { title: "التفاصيل", icon: RiExternalLinkLine, type: "details" },
    { title: "تعديل", icon: RiEditLine, type: "update" },
    { title: "حذف", icon: RiDeleteBin6Line, type: "delete" },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "details":
        navigate(
          `/dashboard/course/${item.id}?academyId=${activeAcademy?.id ?? ""}`,
        );
        break;
      case "update":
        setConfigDialog({
          title: "تعديل الكورس",
          description: "قم بتعديل بيانات الكورس ثم اضغط حفظ.",
          children: <UpdateCourse item={item} />,
        });

        break;

      case "delete":
        setConfigDialog({
          title: "حذف الكورس",
          description: "هل أنت متأكد من حذف الكورس؟ لا يمكن التراجع.",
          children: <DeleteCourse item={item} academyId={academyId!} />,
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
          disabled={!academyId}
        >
          <action.icon className="ml-2 h-4 w-4" />
          <span>{action.title}</span>
        </DropdownMenuItem>
      ))}
    </>
  );
}
