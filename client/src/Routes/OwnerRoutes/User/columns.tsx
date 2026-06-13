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
    key: "roles",
    header: "الصلاحيات",
    display: (data) => (
      <ul className="flex items-center gap-2">
        {data.roles.length
          ? data.roles.map((r) => (
              <li className="bg-accent p-0.5 rounded-sm shadow" key={r}>
                {enumTranslations[r]}
              </li>
            ))
          : "لا يوجد صلاحيات"}
      </ul>
    ),
  },
  {
    key: "isActive",
    header: "الحالة",
    display: (data) => (data.isActive ? "نشط" : "غير نشط"),
  },
];
