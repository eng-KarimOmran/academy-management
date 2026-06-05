import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import PageHeader from "@/components/PageHeader/PageHeader";

import type { Car } from "@/types/car";

import { getAllCars } from "@/service/car.service";

import { columns } from "./columns";
import AddCar from "./Forms/AddCar";
import ActionsCar from "./ActionsCar";

export default function CarPage() {
  const [searchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") ?? "";

  const [debouncedSearch] = useDebounce(search, 500);
  const [limit] = useState<number>(10);

  const { isLoading, isFetching, error, data } = useQuery({
    queryKey: ["cars", debouncedSearch, page],
    queryFn: () =>
      getAllCars({
        limit,
        page,
        search: debouncedSearch,
      }),
    select: (res) => res.data.data,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل السيارات");
    }
  }, [error]);

  const configTable: DataTableProps<Car> = {
    data: data?.items || [],
    maxPage: data?.pagination?.totalPages ?? 1,
    isLoading,
    isFetching,
    headers: columns,
    actions: (item) => <ActionsCar item={item} />,

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
