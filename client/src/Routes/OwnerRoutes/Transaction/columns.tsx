import type { Header } from "@/components/Table/HeaderTable";
import { Button } from "@/components/ui/button";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import type { LedgerTransaction } from "@/types/ledgerTransaction";
import { RiImageLine } from "@remixicon/react";

export const columns: Header<LedgerTransaction>[] = [
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
    key: "senderType",
    header: "المرسل",
    display: (data) => (
      <div className="flex flex-col">
        <span>{enumTranslations[data.senderType] ?? data.senderType}</span>
        <span className="text-xs text-muted-foreground">{data.senderId}</span>
      </div>
    ),
  },

  {
    key: "receiverType",
    header: "المستلم",
    display: (data) => (
      <div className="flex flex-col">
        <span>{enumTranslations[data.receiverType] ?? data.receiverType}</span>
        <span className="text-xs text-muted-foreground">{data.receiverId}</span>
      </div>
    ),
  },

  {
    key: "transactionType",
    header: "نوع العملية",
    display: (data) => (
      <div>
        {enumTranslations[data.transactionType] ?? data.transactionType}
      </div>
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
    key: "proofOfPaymentImage",
    header: "إثبات الدفع",
    display: (data) =>
      data.proofOfPaymentImage ? (
        <Button asChild size="sm" variant="outline">
          <a
            href={data.proofOfPaymentImage.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <RiImageLine size={16} />
            عرض
          </a>
        </Button>
      ) : (
        <span className="text-muted-foreground">لا يوجد</span>
      ),
  },

  {
    key: "createdAt",
    header: "التاريخ",
    display: (data) => (
      <span className="whitespace-nowrap">
        {formatDate(data.createdAt, "datetime")}
      </span>
    ),
  },
];