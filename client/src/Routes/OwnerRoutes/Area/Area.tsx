import PageHeader from "@/components/PageHeader/PageHeader";
import TableUi, { type DataTableProps } from "@/components/Table/TableUi";

import { getAllAreas } from "@/service/area.service";

import type { Area } from "@/types/area";

import AddArea from "./Forms/AddArea";
import ActionsArea from "./ActionsArea";
import { columns } from "./columns";
import useAppQuery from "@/hooks/useAppQueryGetAll";
import type { GetAllDto } from "@/DTOs/area.dto";

export default function AreaPage() {
  const { data, isLoading, isFetching } = useAppQuery<GetAllDto, Area>({
    queryFn: getAllAreas,
    queryKey: ["areas"],
    keepPrevious: true,
    filters: ["isActive", "supportType"],
  });

  const filters = [
    {
      group: "حالة المنطقة",
      option: [
        {
          key: "isActive",
          label: "نشطة",
          val: "true",
        },
        {
          key: "isActive",
          label: "غير نشطة",
          val: "false",
        },
      ],
    },
    {
      group: "ناقل الحركة",
      option: [
        {
          key: "supportType",
          label: "مانول",
          val: "MANUAL",
        },
        {
          key: "supportType",
          label: "أتوماتك",
          val: "AUTOMATIC",
        },
      ],
    },
  ];

  const configTable: DataTableProps<Area> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsArea item={item} />,
    filters,
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