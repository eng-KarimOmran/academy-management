import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import { getAllAcademies } from "@/service/academy.service";
import { columns } from "./columns";
import PageHeader, {
  type PageHeaderProps,
} from "@/components/PageHeader/PageHeader";
import Add from "./Forms/AddAcademy";
import ActionsAcademy from "./ActionsAcademy";
import type { Academy } from "@/types/academy";

export default function AcademyPage() {
  const [searchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") ?? "";
  const [debouncedSearch] = useDebounce(search, 500);
  const [limit] = useState<number>(10);

  const { isLoading, isFetching, error, data } = useQuery({
    queryKey: ["academies", debouncedSearch, page],
    queryFn: () =>
      getAllAcademies({
        limit,
        page,
        search: debouncedSearch,
      }),
    select: (res) => res.data.data,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل البيانات");
    }
  }, [error]);

  const configTable: DataTableProps<Academy> = {
    data: data?.items || [],
    maxPage: data?.pagination.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsAcademy item={item} />,
    configDialogAdd: {
      title: "إضافة أكاديمية جديدة",
      description: "قم بإدخال بيانات الأكاديمية لإضافتها إلى النظام.",
      children: <Add />,
    },
  };

  const configHeader: PageHeaderProps = {
    title: "إدارة الأكاديميات",
    description:
      "إدارة الأكاديميات تشمل عرض بيانات كل أكاديمية، مع إمكانية الإضافة والحذف والتعديل.",
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader {...configHeader} />
      <TableUi {...configTable} />
    </section>
  );
}