import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader, {
  type PageHeaderProps,
} from "@/components/PageHeader/PageHeader";

import { getAllClients } from "@/service/client.service";
import type { Client } from "@/types/client";

import AddClient from "./Forms/AddClient";
import ActionsClient from "./ActionsClient";

import { columns } from "./columns";
import type { GetAllClientsDto } from "@/DTOs/client.dto";
import useAppQuery from "@/hooks/useAppQueryGetAll";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";

export default function ClientsPage() {
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id;

  const { data, isFetching, isLoading } = useAppQuery<GetAllClientsDto, Client>(
    {
      queryFn: (params) => {
        if (!academyId) throw new Error("من فضلك اختر الأكاديمية");
        return getAllClients({
          query: params.query,
          params: { academyId },
        });
      },
      queryKey: ["clients", academyId!],
      keepPrevious: true,
      filters: ["source"],
    },
  )

  const filters = [
    {
      group: "مصدر العميل",
      option: [
        {
          key: "source",
          val: "PLATFORM",
        },
        {
          key: "source",
          label: "المكتب",
          val: "OFFICE",
        },
      ],
    },
  ];

  const configTable: DataTableProps<Client> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,

    actions: (item) => <ActionsClient item={item} />,

    filters,

    configDialogAdd: {
      title: "إضافة عميل جديد",
      description: "قم بإدخال بيانات العميل الجديد.",
      children: <AddClient />,
    },
  };

  const configHeader: PageHeaderProps = {
    title: "إدارة العملاء",
    description: "عرض وإدارة جميع العملاء داخل الأكاديمية",
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader {...configHeader} />
      <TableUi {...configTable} />
    </section>
  );
}