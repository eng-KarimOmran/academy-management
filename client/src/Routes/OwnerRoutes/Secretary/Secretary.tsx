import PageHeader from "@/components/PageHeader/PageHeader";
import TableUi, { type DataTableProps } from "@/components/Table/TableUi";

import { getAllSecretaries } from "@/service/secretary.service";
import type { Secretary } from "@/types/secretary";

import AddSecretary from "./Forms/AddSecretary";
import ActionsSecretary from "./ActionsSecretary";
import { columns } from "./columns";

import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import type { GetAllDto } from "@/DTOs/secretary.dto";
import useAppQuery from "@/hooks/useAppQuery";

export default function SecretaryPage() {
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id;

  const { data, isFetching, isLoading } = useAppQuery<GetAllDto, Secretary>({
    queryFn: (params) => {
      if (!academyId) throw new Error("من فضلك اختر الأكاديمية");
      return getAllSecretaries({
        query: params.query,
        params: { academyId: academyId! },
      });
    },
    queryKey: ["secretaries", academyId!],
    keepPrevious: true,
    enabled: !!academyId,
  });

  const configTable: DataTableProps<Secretary> = {
    data: data?.items ?? [],
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
