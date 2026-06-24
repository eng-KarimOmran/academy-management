import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";

import { getAllClients } from "@/service/client.service";
import type { Client } from "@/types/client";

import AddClient from "./Forms/AddClient";
import ActionsClient from "./ActionsClient";

import { columns } from "./columns";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";

export default function ClientsPage() {
  const [searchParams] = useSearchParams();
  const { activeAcademy } = useActiveAcademyState();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const search = searchParams.get("search") ?? "";

  const [debouncedSearch] = useDebounce(search, 500);
  const runSearch = debouncedSearch.length > 2;
  const [limit] = useState(10);

  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [
      "clients",
      academyId,
      ...[runSearch ? debouncedSearch : undefined],
      page,
    ],
    queryFn: () =>
      getAllClients({
        query: {
          page,
          limit,
          search: runSearch ? debouncedSearch : undefined,
        },
        params: { academyId: academyId! },
      }),
    select: (res) => res.data.data,
    placeholderData: keepPreviousData,
    enabled: !!academyId,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل العملاء");
    }
  }, [error]);

  const configTable: DataTableProps<Client> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsClient item={item} />,

    configDialogAdd: {
      title: "إضافة عميل جديد",
      description: "قم بإدخال بيانات العميل الجديد.",
      children: <AddClient />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة العملاء"
        description="عرض وإدارة جميع العملاء داخل الأكاديمية"
      />

      <TableUi {...configTable} />
    </section>
  );
}
