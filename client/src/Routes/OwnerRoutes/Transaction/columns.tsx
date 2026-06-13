import { BadgeDemo } from "@/components/CustomBadge/CustomBadge";
import type { Header } from "@/components/Table/HeaderTable";
import { Button } from "@/components/ui/button";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import type { Payment } from "@/types/transaction";
import { RiImageLine } from "@remixicon/react";

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
        <span className="font-semibold text-[14px]">{data.client.name}</span>
        <span className="text-xs text-muted-foreground font-mono" dir="ltr">
          {data.client.phone}
        </span>
      </div>
    ),
  },

  {
    key: "receiver",
    header: "المستلم",
    display: (data) => (
      <div className="flex flex-col">
        <span className="font-medium text-[14px]">{data.receiver.name}</span>
        <span className="text-[11px] text-muted-foreground">
          {data.receiver.phone}
        </span>
      </div>
    ),
  },
  {
    key: "type",
    header: "النوع",
    display: (data) => (
      <BadgeDemo type={data.type} text={enumTranslations[data.type]} />
    ),
  },
  {
    key: "paymentMethod",
    header: "طريقة الدفع",
    display: (data) => (
      <div className="text-sm font-medium text-muted-foreground">
        {enumTranslations[data.paymentMethod]}
      </div>
    ),
  },
  {
    key: "proofOfPaymentImage",
    header: "اثبات الدفع",
    display: (data) => {
      console.log(data.proofOfPaymentImage);
      return (
        <div className="text-sm font-medium text-muted-foreground">
          {data.proofOfPaymentImage ? (
            <Button asChild>
              <a
                href={data.proofOfPaymentImage.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <RiImageLine className="text-base" />
                عرض إثبات الدفع
              </a>
            </Button>
          ) : (
            "لا يوجد"
          )}
        </div>
      );
    },
  },
  {
    key: "status",
    header: "الحالة",
    display: (data) => (
      <BadgeDemo type={data.status} text={enumTranslations[data.status]} />
    ),
  },
  {
    key: "createdAt",
    header: "التاريخ",
    display: (data) => (
      <div className="text-xs flex flex-col items-start gap-1">
        <span className="font-medium text-foreground">
          {formatDate(data.createdAt, "datetime")}
        </span>
      </div>
    ),
  },
];
