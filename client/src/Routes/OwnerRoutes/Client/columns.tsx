import ShowMore from "@/components/ShowMore/ShowMore";
import type { Header } from "@/components/Table/HeaderTable";
import type { Client } from "@/types/client";

export const columns: Header<Client>[] = [
  {
    key: "id",
    header: "معرف العميل",
    display: (data) => <ShowMore text={data.id} columns={3} />,
  },
  {
    key: "name",
    header: "الاسم",
    display: (data) => data.name,
  },
  {
    key: "phone",
    header: "الهاتف",
    display: (data) => data.phone,
  },
  {
    key: "clientSource",
    header: "مصدر العميل",
    display: (data) => data.clientSource,
  },
];
