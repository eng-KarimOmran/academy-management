import type { Header } from "@/components/Table/HeaderTable";
import type { User } from "@/types/user";

export const columns: Header<User>[] = [
  {
    key: "name",
    header: "الاسم",
    display: (data) => data.name,
  },
  {
    key: "phone",
    header: "رقم الهاتف",
    display: (data) => data.phone,
  },
  {
    key: "isActive",
    header: "الحالة",
    display: (data) => (data.isActive ? "نشط" : "غير نشط"),
  },
];
