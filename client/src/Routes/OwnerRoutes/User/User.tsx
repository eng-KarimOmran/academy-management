import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";

import type { User } from "@/types/user";

import { getAllUsers } from "@/service/user.service";

import { columns } from "./columns";
import ActionsUser from "./ActionsUser";
import AddUser from "./Forms/AddUser";

export default function UserPage() {
  const [searchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") ?? "";

  const [debouncedSearch] = useDebounce(search, 500);
  const [limit] = useState<number>(10);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["users", debouncedSearch, page],
    queryFn: () =>
      getAllUsers({
        page,
        limit,
        search: debouncedSearch,
      }),
    select: (res) => res.data.data,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل المستخدمين");
    }
  }, [error]);

  const configTable: DataTableProps<User> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsUser item={item} />,

    configDialogAdd: {
      title: "إضافة مستخدم جديد",
      description: "قم بإدخال بيانات المستخدم الجديد.",
      children: <AddUser />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة المستخدمين"
        description="عرض وإدارة جميع المستخدمين المسجلين."
      />

      <TableUi {...configTable} />
    </section>
  );
}
