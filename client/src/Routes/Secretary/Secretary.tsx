import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";

import { getAllSecretaries } from "@/service/secretary.service";
import type { Secretary } from "@/types/secretary";

import AddSecretary from "./Forms/AddSecretary";
import ActionsSecretary from "./ActionsSecretary";

import { columns } from "./columns";

export default function SecretaryPage() {
  const [searchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") ?? "";

  const [debouncedSearch] = useDebounce(search, 500);
  const [limit] = useState<number>(10);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["secretaries", debouncedSearch, page],
    queryFn: () =>
      getAllSecretaries({
        page,
        limit,
        search: debouncedSearch,
      }),
    select: (res) => res.data.data,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل السكرتارية");
    }
  }, [error]);

  const configTable: DataTableProps<Secretary> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsSecretary item={item} />,

    configDialogAdd: {
      title: "إضافة سكرتير جديد",
      description: "قم بإدخال بيانات السكرتير الجديد.",
      children: <AddSecretary />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة السكرتارية"
        description="عرض وإدارة جميع السكرتارية المسجلين."
      />

      <TableUi {...configTable} />
    </section>
  );
}
