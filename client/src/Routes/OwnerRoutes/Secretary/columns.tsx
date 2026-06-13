import type { Header } from "@/components/Table/HeaderTable";
import type { Secretary } from "@/types/secretary";

export const columns: Header<Secretary>[] = [
  {
    key: "user",
    header: "الاسم",
    display: (data) => data.user.name,
  },
  {
    key: "user",
    header: "الهاتف",
    display: (data) => data.user.phone,
  },
  {
    key: "baseSalary",
    header: "المرتب الأساسي",
    display: (data) => `${data.baseSalary} ج.م`,
  },
  {
    key: "targetCount",
    header: "التارجت",
    display: (data) => data.targetCount,
  },
  {
    key: "bonusAmount",
    header: "البونص",
    display: (data) => `${data.bonusAmount} ج.م`,
  },
];