import PageHeader from "@/components/PageHeader/PageHeader";
import TableUi, { type DataTableProps } from "@/components/Table/TableUi";

import { getAllCourses } from "@/service/course.service";

import type { Course } from "@/types/course";

import ActionsCourse from "./ActionsCourse";
import AddCourse from "./Forms/AddCourse";
import { columns } from "./columns";

import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import type { GetAllDto } from "@/DTOs/course.dto";
import useAppQuery from "@/hooks/useAppQueryGetAll";

export default function CoursePage() {
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching } = useAppQuery<GetAllDto, Course>({
    queryFn: (params) => {
      if (!academyId) throw new Error("من فضلك اختر الأكاديمية");
      return getAllCourses({
        query: params.query,
        params: { academyId },
      });
    },

    queryKey: ["courses", academyId!],
    keepPrevious: true,

    filters: ["isActive"],

    enabled: !!academyId,
  });

  const filters = [
    {
      group: "حالة الكورس",
      option: [
        {
          key: "isActive",
          label: "نشط",
          val: "true",
        },
        {
          key: "isActive",
          label: "غير نشط",
          val: "false",
        },
      ],
    },
  ];

  const configTable: DataTableProps<Course> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsCourse item={item} academyId={academyId} />,

    filters,

    configDialogAdd: {
      title: "إضافة كورس جديد",
      description: "قم بإدخال بيانات الكورس الجديد.",
      children: <AddCourse academyId={academyId!} />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة الكورسات"
        description="عرض وإدارة جميع الكورسات داخل الأكاديمية."
      />

      <TableUi {...configTable} />
    </section>
  );
}
