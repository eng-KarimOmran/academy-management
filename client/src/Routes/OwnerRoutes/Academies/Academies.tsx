import PageHeader, {
  type PageHeaderProps,
} from "@/components/PageHeader/PageHeader";
import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import { getAllAcademies } from "@/service/academy.service";
import type { Academy } from "@/types/academy";

import Add from "./Forms/AddAcademy";
import ActionsAcademy from "./ActionsAcademy";
import useAppQuery from "@/hooks/useAppQuery";
import type { GetAllAcademiesDto } from "@/DTOs/academy.dto";
import { columns } from "./columns";

export default function AcademyPage() {
  const { data, isFetching, isLoading } = useAppQuery<
    GetAllAcademiesDto,
    Academy
  >({
    queryFn: getAllAcademies,
    queryKey: ["academies"],
    keepPrevious: true,
  });

  const configTable: DataTableProps<Academy> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsAcademy item={item} />,
    configDialogAdd: {
      title: "إضافة أكاديمية جديدة",
      description: "قم بإدخال بيانات الأكاديمية لإضافتها إلى النظام.",
      children: <Add />,
    },
  };

  const configHeader: PageHeaderProps = {
    title: "إدارة الأكاديميات",
    description:
      "إدارة الأكاديميات تشمل عرض بيانات كل أكاديمية، مع إمكانية الإضافة والحذف والتعديل.",
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader {...configHeader} />
      <TableUi {...configTable} />
    </section>
  );
}
