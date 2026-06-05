import type { Header } from "@/components/Table/HeaderTable";
import { enumTranslations } from "@/lib/enumTranslations";
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
    key: "role",
    header: "الصلاحية",
    display: (data) => enumTranslations[data.role],
  },
];
