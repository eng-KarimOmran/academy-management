import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";
import { columns } from "./columns";
import ActionsUser from "./ActionsUser";
import AddUser from "./Forms/AddUser";

import type { User } from "@/types/user";
import { getAllUsers } from "@/service/user.service";
import useAppQuery from "@/hooks/useAppQuery";
import type { GetAllUsersDto } from "@/DTOs/user.dto";

export default function UserPage() {
  const { data, isFetching, isLoading } = useAppQuery<GetAllUsersDto, User>({
    queryFn: getAllUsers,
    queryKey: ["users"],
    keepPrevious: true,
    filters: ["isActive", "role"],
  });

  const filters = [
    {
      group: "حالة المستخدم",
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
      group: "الدور الوظيفي",
      option: [
        {
          key: "role",
          label: "مدير",
          val: "MANAGER",
        },
        {
          key: "role",
          label: "كابتن",
          val: "CAPTAIN",
        },
        {
          key: "role",
          label: "سكرتير",
          val: "SECRETARY",
        },
        {
          key: "role",
          label: "مالك النظام",
          val: "OWNER",
        },
      ],
    },
  ];

  const configTable: DataTableProps<User> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsUser item={item} />,
    filters,
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