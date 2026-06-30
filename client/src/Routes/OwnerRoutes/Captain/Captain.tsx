import PageHeader from "@/components/PageHeader/PageHeader";
import TableUi, { type DataTableProps } from "@/components/Table/TableUi";

import { getAllCaptains } from "@/service/captain.service";
import type { Captain } from "@/types/captain";

import AddCaptain from "./Forms/AddCaptain";
import ActionsCaptain from "./ActionsCaptain";
import { columns } from "./columns";

import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import type { GetAllDto } from "@/DTOs/captain.dto";
import useAppQuery from "@/hooks/useAppQueryGetAll";

export default function CaptainPage() {
  const { activeAcademy } = useActiveAcademyState();
  const academyId = activeAcademy?.id;

  const { data, isLoading, isFetching } = useAppQuery<GetAllDto, Captain>({
    queryFn: (params) => {
      if (!academyId) throw new Error("من فضلك اختر الأكاديمية");
      return getAllCaptains({
        query: params.query,
        params: { academyId },
      });
    },
    queryKey: ["captains", academyId!],
    keepPrevious: true,
    filters: ["isActive", "supportType"],
    enabled: !!academyId,
  });

  const filters = [
    {
      group: "حالة الكابتن",
      option: [
        {
          key: "isActive",
          label: "نشط",
          val: "true",
        },
        {
          key: "isActive",
          label: "غير نشط",
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

  const configTable: DataTableProps<Captain> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsCaptain item={item} />,
    filters,
    configDialogAdd: {
      title: "إضافة كابتن جديد",
      description: "قم بإدخال بيانات الكابتن الجديد.",
      children: <AddCaptain />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة الكباتن"
        description="عرض وإدارة جميع الكباتن المسجلين."
      />

      <TableUi {...configTable} />
    </section>
  );
}
