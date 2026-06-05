import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";

import { getAllCourses } from "@/service/course.service";
import type { CourseDetails } from "@/types/course";

import ActionsCourse from "./ActionsCourse";
import { columns } from "./columns";
import AddCourse from "./Forms/AddCourse";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";

export default function CoursePage() {
  const [searchParams] = useSearchParams();
  const { activeAcademy } = useActiveAcademyState();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") ?? "";

  const [debouncedSearch] = useDebounce(search, 500);
  const [limit] = useState(10);

  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["courses", academyId, debouncedSearch, page],
    queryFn: () =>
      getAllCourses({
        academyId: academyId!,
        page,
        limit,
        search: debouncedSearch,
      }),
    select: (res) => res.data.data,
    placeholderData: keepPreviousData,
    enabled: !!academyId,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل الكورسات");
    }
  }, [error]);

  if (!academyId) {
    return <Navigate to="/dashboard/course" />;
  }
  const configTable: DataTableProps<CourseDetails> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsCourse item={item} academyId={academyId} />,

    configDialogAdd: {
      title: "إضافة كورس جديد",
      description: "قم بإدخال بيانات الكورس الجديد.",
      children: <AddCourse academyId={academyId} />,
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