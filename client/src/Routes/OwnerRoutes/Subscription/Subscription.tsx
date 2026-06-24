import PageHeader from "@/components/PageHeader/PageHeader";
import TableUi, { type DataTableProps } from "@/components/Table/TableUi";

import useAppQuery from "@/hooks/useAppQuery";
import { getAllSubscriptions } from "@/service/subscription.service";

import type { SubscriptionBase } from "@/types/subscription";

import ActionsSubscription from "./ActionsSubscription";
import AddSubscription from "./Forms/AddSubscription";
import { columns } from "./columns";

import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import type { GetAllSubscriptionsDto } from "@/DTOs/subscription.dto";

export default function SubscriptionPage() {
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching } = useAppQuery<
    GetAllSubscriptionsDto,
    SubscriptionBase
  >({
    queryFn: (params) => {
      if (!academyId) throw new Error("من فضلك اختر الأكاديمية");

      return getAllSubscriptions({
        query: params.query,
        params: { academyId },
      });
    },

    queryKey: ["subscriptions", academyId!],
    keepPrevious: true,

    filters: ["status"],

    enabled: !!academyId,
  });

  const filters = [
    {
      group: "حالة الاشتراك",
      option: [
        {
          key: "status",
          label: "مكتمل",
          val: "COMPLETED",
        },
        {
          key: "status",
          label: "ملغي",
          val: "CANCELED",
        },
        {
          key: "status",
          label: "نشط",
          val: "ACTIVE",
        },
        {
          key: "status",
          label: "لم يكمل الدفع",
          val: "ACTIVE_LIMITED",
        },
        {
          key: "status",
          label: "لم يدفع الديبوزت",
          val: "PENDING_DEPOSIT",
        },
      ],
    },
  ];

  const configTable: DataTableProps<SubscriptionBase> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsSubscription item={item} />,

    filters,

    configDialogAdd: {
      title: "إضافة اشتراك جديد",
      description: "قم بإدخال بيانات الاشتراك الجديد.",
      children: <AddSubscription />,
    },
  };

  console.log(data?.items)

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
