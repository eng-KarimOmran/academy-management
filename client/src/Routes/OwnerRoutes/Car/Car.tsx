import PageHeader from "@/components/PageHeader/PageHeader";
import TableUi, { type DataTableProps } from "@/components/Table/TableUi";

import { getAllCars } from "@/service/car.service";

import type { Car } from "@/types/car";

import AddCar from "./Forms/AddCar";
import ActionsCar from "./ActionsCar";
import { columns } from "./columns";
import type { GetAllDto } from "@/DTOs/car.dto";
import useAppQuery from "@/hooks/useAppQuery";

export default function CarPage() {
  const { data, isLoading, isFetching } = useAppQuery<GetAllDto, Car>({
    queryFn: getAllCars,
    queryKey: ["cars"],
    keepPrevious: true,
    filters: ["gearType", "isActive"],
  });

  const filters = [
    {
      group: "حالة السيارة",
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

  const configTable: DataTableProps<Car> = {
    data: data?.items ?? [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsCar item={item} />,
    filters,
    configDialogAdd: {
      title: "إضافة سيارة جديدة",
      description: "قم بإدخال بيانات السيارة الجديدة.",
      children: <AddCar />,
    },
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="إدارة السيارات"
        description="عرض وإدارة جميع السيارات المسجلة."
      />

      <TableUi {...configTable} />
    </section>
  );
}
