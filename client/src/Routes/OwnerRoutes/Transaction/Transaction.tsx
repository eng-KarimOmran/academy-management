import PageHeader from "@/components/PageHeader/PageHeader";
import TableUi, { type DataTableProps } from "@/components/Table/TableUi";

import { getAllLedgerTransactions } from "@/service/ledgerTransactions.service";


import ActionsTransaction from "./ActionsTransaction";
import AddTransaction from "./Forms/AddTransaction";
import { columns } from "./columns";

import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import type { GetAllLedgerTransactionsDto } from "@/DTOs/ledgerTransactions.dto";
import useAppQuery from "@/hooks/useAppQuery";
import type { LedgerTransaction } from "@/types/ledgerTransaction";

export default function TransactionsPage() {
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching } = useAppQuery<
    GetAllLedgerTransactionsDto,
    LedgerTransaction
  >({
    queryFn: (params) => {
      if (!academyId) throw new Error("من فضلك اختر الأكاديمية");

      return getAllLedgerTransactions({
        params: { academyId: academyId! },
        query: params.query,
      });
    },

    queryKey: ["transactions", academyId!],
    keepPrevious: true,

    filters: ["paymentMethod", "transactionType"],

    enabled: !!academyId,
  });

  const filters = [
    {
      group: "نوع المعاملة",
      option: [
        {
          key: "transactionType",
          label: "سحب",
          val: "PAYMENT",
        },
        {
          key: "transactionType",
          label: "ارجاع",
          val: "REFUND",
        },
        {
          key: "transactionType",
          label: "تحويل",
          val: "TRANSFER",
        },
      ],
    },
  ];

  const configTable: DataTableProps<LedgerTransaction> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsTransaction item={item} />,

    filters,

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
