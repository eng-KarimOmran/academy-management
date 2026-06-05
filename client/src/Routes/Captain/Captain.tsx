import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";

import { getAllCaptains } from "@/service/captain.service";
import type { Captain } from "@/types/captain";

import AddCaptain from "./Forms/AddCaptain";
import ActionsCaptain from "./ActionsCaptain";

import { columns } from "./columns";

export default function CaptainPage() {
  const [searchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") ?? "";

  const [debouncedSearch] = useDebounce(search, 500);
  const [limit] = useState<number>(10);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["captains", debouncedSearch, page],
    queryFn: () =>
      getAllCaptains({
        page,
        limit,
        search: debouncedSearch,
      }),
    select: (res) => res.data.data,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل الكباتن");
    }
  }, [error]);

  const configTable: DataTableProps<Captain> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsCaptain item={item} />,

    configDialogAdd: {
      title: "إضافة كابتن جديد",
      description: "قم بإدخال بيانات الكابتن الجديد.",
      children: <AddCaptain />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة الكباتن"
        description="عرض وإدارة جميع الكباتن المسجلين."
      />

      <TableUi {...configTable} />
    </section>
  );
}
