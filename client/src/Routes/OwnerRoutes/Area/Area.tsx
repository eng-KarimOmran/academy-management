import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import { getAllAreas } from "@/service/area.service";
import { columns } from "./columns";
import type { Area } from "@/types/area";

import AddArea from "./Forms/AddArea";
import ActionsArea from "./ActionsArea";
import PageHeader from "@/components/PageHeader/PageHeader";

export default function AreaPage() {
  const [searchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") ?? "";
  const [debouncedSearch] = useDebounce(search, 500);
  const [limit] = useState<number>(10);

  const { isLoading, isFetching, error, data } = useQuery({
    queryKey: ["areas", debouncedSearch, page],
    queryFn: () => getAllAreas({ limit, page, search: debouncedSearch }),
    select: (res) => res.data.data,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) toast.error(error.message || "خطأ في تحميل المناطق");
  }, [error]);

  const configTable: DataTableProps<Area> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsArea item={item} />,
    configDialogAdd: {
      title: "إضافة منطقة جديدة",
      description: "قم بإدخال بيانات المنطقة الجديدة.",
      children: <AddArea />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة المناطق"
        description="عرض وإدارة جميع المناطق المسجلة."
      />
      <TableUi {...configTable} />
    </section>
  );
}
