import { useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";

import { getAllLessons } from "@/service/lesson.service";
import type { LessonBase } from "@/types/lesson";

import ActionsLesson from "./ActionsLesson";
import { columns } from "./columns";
import AddLesson from "./Forms/AddLesson";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";

export default function LessonPage() {
  const [searchParams] = useSearchParams();
  const { activeAcademy } = useActiveAcademyState();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limitValue = Number(searchParams.get("limit")) || 10;

  const search = searchParams.get("search") ?? "";
  const [debouncedSearch] = useDebounce(search, 500);

  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["lessons", academyId, page, limitValue, debouncedSearch],
    queryFn: () =>
      getAllLessons({
        academyId: academyId!,
        page,
        limit: limitValue,
      }),
    select: (res) => res.data.data,
    placeholderData: keepPreviousData,
    enabled: !!academyId,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل الحصص");
    }
  }, [error]);

  if (!academyId) {
    return <Navigate to="/dashboard/lesson" />;
  }

  const configTable: DataTableProps<LessonBase> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsLesson item={item} academyId={academyId} />,

    configDialogAdd: {
      title: "إضافة حصة جديدة",
      description:
        "قم بإدخال بيانات الحصة التدريبية الجديدة وتعيين الكابتن والسيارة.",
      children: <AddLesson academyId={academyId} />,
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
