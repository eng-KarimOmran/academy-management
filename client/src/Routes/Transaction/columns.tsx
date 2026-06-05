import type { Header } from "@/components/Table/HeaderTable";
import { Badge } from "@/components/ui/badge";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import type { Payment } from "@/types/transaction";
import { StatusBadge } from "./components/StatusBadge";

export const columns: Header<Payment>[] = [
  {
    key: "amount",
    header: "المبلغ",
    display: (data) => (
      <div className="font-bold text-primary whitespace-nowrap">
        {data.amount.toLocaleString("ar-EG")} ج.م
      </div>
    ),
  },
  {
    key: "subscription",
    header: "العميل",
    display: (data) => (
      <div className="flex flex-col">
        <span className="font-semibold text-[14px]">
          {data.subscription.client.name}
        </span>
        <span className="text-xs text-muted-foreground font-mono" dir="ltr">
          {data.subscription.client.phone}
        </span>
      </div>
    ),
  },
  // --- إضافة: المستلم (الموظف الذي باشر العملية) ---
  {
    key: "receiver",
    header: "المستلم",
    display: (data) => (
      <div className="flex flex-col">
        <span className="font-medium text-[14px]">{data.receiver.name}</span>
        <span className="text-[11px] text-muted-foreground">
          {enumTranslations[data.receiver.role] ?? data.receiver.role}
        </span>
      </div>
    ),
  },
  // --- إضافة: الفرع (مهم للتقارير لو فيه أكتر من فرع) ---
  {
    key: "academy",
    header: "الفرع",
    display: (data) => (
      <div className="text-sm font-medium text-foreground">
        {data.academy.name}
      </div>
    ),
  },
  {
    key: "type",
    header: "النوع",
    display: (data) => (
      <Badge
        variant="outline"
        className="bg-muted/50 border-transparent shadow-none font-medium"
      >
        {enumTranslations[data.type] ?? data.type}
      </Badge>
    ),
  },
  {
    key: "paymentMethod",
    header: "طريقة الدفع",
    display: (data) => (
      <div className="text-sm font-medium text-muted-foreground">
        {enumTranslations[data.paymentMethod] ?? data.paymentMethod}
      </div>
    ),
  },
  {
    key: "status",
    header: "الحالة",
    display: (data) => <StatusBadge status={data.status} />,
  },
  {
    key: "createdAt",
    header: "التاريخ",
    display: (data) => (
      <div className="text-xs flex flex-col items-start gap-1">
        <span className="font-medium text-foreground">
          {formatDate(data.createdAt)}
        </span>
      </div>
    ),
  },
];
