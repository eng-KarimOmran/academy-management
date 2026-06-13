import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";

import { getAllPaymentTransactions } from "@/service/transaction.service";

import ActionsTransaction from "./ActionsTransaction";
import { columns } from "./columns";
import AddTransaction from "./Forms/AddTransaction";

import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import type { Payment } from "@/types/transaction";

export default function TransactionsPage() {
  const [searchParams] = useSearchParams();
  const { activeAcademy } = useActiveAcademyState();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") ?? "";

  const [debouncedSearch] = useDebounce(search, 500);
  const [limit] = useState(10);

  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["transactions", academyId, debouncedSearch, page],
    queryFn: () =>
      getAllPaymentTransactions({
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
      toast.error(error.message || "خطأ في تحميل المعاملات");
    }
  }, [error]);

  const configTable: DataTableProps<Payment> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsTransaction item={item} />,

    configDialogAdd: {
      title: "إضافة معاملة جديدة",
      description: "قم بإدخال بيانات المعاملة الجديدة.",
      children: <AddTransaction academyId={academyId!} />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة المعاملات المالية"
        description="عرض وإدارة جميع المدفوعات داخل الأكاديمية."
      />

      <TableUi {...configTable} />
    </section>
  );
}
