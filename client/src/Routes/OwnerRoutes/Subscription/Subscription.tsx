import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";

import { getAllSubscriptions } from "@/service/subscription.service";
import type { SubscriptionBase } from "@/types/subscription";

import ActionsSubscription from "./ActionsSubscription";
import { columns } from "./columns";
import AddSubscription from "./Forms/AddSubscription";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";

export default function SubscriptionPage() {
  const [searchParams] = useSearchParams();
  const { activeAcademy } = useActiveAcademyState();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") ?? "";

  const [debouncedSearch] = useDebounce(search, 500);
  const [limit] = useState(10);

  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["subscriptions", academyId, debouncedSearch, page],
    queryFn: () =>
      getAllSubscriptions({
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
      toast.error(error.message || "خطأ في تحميل الاشتراكات");
    }
  }, [error]);

  const configTable: DataTableProps<SubscriptionBase> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsSubscription item={item} />,

    configDialogAdd: {
      title: "إضافة اشتراك جديد",
      description: "قم بإدخال بيانات الاشتراك الجديد.",
      children: <AddSubscription academyId={academyId} />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة الاشتراكات"
        description="عرض وإدارة جميع الاشتراكات داخل الأكاديمية."
      />

      <TableUi {...configTable} />
    </section>
  );
}
