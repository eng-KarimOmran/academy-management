import PageHeader from "@/components/PageHeader/PageHeader";
import TableUi, { type DataTableProps } from "@/components/Table/TableUi";

import { getAllLessons } from "@/service/lesson.service";

import type { LessonBase } from "@/types/lesson";

import ActionsLesson from "./ActionsLesson";
import AddLesson from "./Forms/AddLesson";
import { columns } from "./columns";

import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import type { GetAllLessonsDto } from "@/DTOs/lesson.dto";
import useAppQuery from "@/hooks/useAppQueryGetAll";

export default function LessonPage() {
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching } = useAppQuery<
    GetAllLessonsDto,
    LessonBase
  >({
    queryFn: (params) => {
      if (!academyId) throw new Error("من فضلك اختر الأكاديمية");

      return getAllLessons({
        query: params.query,
        params: { academyId },
      });
    },

    queryKey: ["lessons", academyId!],
    keepPrevious: true,

    filters: ["status", "transmission"],

    enabled: !!academyId,
  });

  const filters = [
    {
      group: "حالة الحصة",
      option: [
        {
          key: "status",
          label: "مجدولة",
          val: "SCHEDULED",
        },
        {
          key: "status",
          label: "مكتملة",
          val: "COMPLETED",
        },
        {
          key: "status",
          label: "ملغية",
          val: "CANCELED",
        },
        {
          key: "status",
          label: "ملغية مع احتساب رسوم",
          val: "CANCELED_CHARGED",
        },
      ],
    },
    {
      group: "ناقل الحركة",
      option: [
        {
          key: "supportType",
          label: "مانول",
          val: "MANUAL",
        },
        {
          key: "supportType",
          label: "أتوماتك",
          val: "AUTOMATIC",
        },
      ],
    },
  ];

  const configTable: DataTableProps<LessonBase> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsLesson item={item} academyId={academyId!} />,

    filters,

    configDialogAdd: {
      title: "إضافة حصة جديدة",
      description:
        "قم بإدخال بيانات الحصة التدريبية الجديدة وتعيين الكابتن والسيارة.",
      children: <AddLesson academyId={academyId!} />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة الحصص العملية"
        description="عرض وإدارة وتحديث حالات جميع الحصص التدريبية."
      />
      <TableUi {...configTable} />
    </section>
  );
}
