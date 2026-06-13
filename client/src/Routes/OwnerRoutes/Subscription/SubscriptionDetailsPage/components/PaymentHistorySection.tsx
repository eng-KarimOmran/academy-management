import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgeDemo } from "@/components/CustomBadge/CustomBadge";
import ButtonAdd from "@/components/Table/ButtonAdd";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import AddTransaction from "@/Routes/OwnerRoutes/Transaction/Forms/AddTransaction";
import type { SubscriptionDetails } from "@/types/subscription";
import { Link } from "react-router-dom";
import {
  RiEye2Fill,
  RiNoCreditCardFill,
  RiReceiptFill,
  RiWallet2Fill,
} from "@remixicon/react";

type Props = {
  payments: SubscriptionDetails["payments"];
  subscriptionId: string;
  academyId: string;
};

export default function PaymentHistorySection({
  payments,
  academyId,
  subscriptionId,
}: Props) {
  const configDialogAdd = {
    title: "إضافة معاملة جديدة",
    description: "قم بإدخال بيانات المعاملة الجديدة.",
    children: (
      <AddTransaction academyId={academyId} subscriptionId={subscriptionId} />
    ),
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="payments-section"
        className="rounded-2xl border bg-card px-5 shadow-sm sm:px-6 transition-all duration-200 hover:shadow-md"
      >
        <AccordionTrigger className="py-5 hover:no-underline sm:py-6">
          <div className="flex items-center gap-3 text-right">
            <RiReceiptFill className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              سجل المدفوعات
            </h2>
            {payments.length > 0 && (
              <span className="flex h-5 items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-semibold text-primary">
                {payments.length}
              </span>
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent key={payments.length}>
          <div className="flex flex-col gap-5 pb-4">
            <div className="flex justify-end border-b border-border/60 pb-4">
              <ButtonAdd configDialogAdd={configDialogAdd} />
            </div>

            {payments.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-10 text-center bg-muted/20">
                <div className="rounded-full bg-background p-3 shadow-sm border mb-3">
                  <RiWallet2Fill className="h-6 w-6 text-muted-foreground/80" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  لا توجد مدفوعات مسجلة حتى الآن.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {payments.map((p) => (
                  <li
                    key={p.id}
                    className="flex flex-col gap-4 rounded-xl border border-border/60 bg-muted/20 p-4 transition-all duration-200 hover:bg-muted/40 hover:border-border sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg font-bold text-foreground tracking-tight">
                          {p.amount}{" "}
                          <span className="text-sm font-medium text-muted-foreground mr-0.5">
                            جنيه
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2 py-0.5 text-xs font-semibold text-secondary-foreground border border-border/20">
                          <RiNoCreditCardFill className="h-3 w-3 opacity-70" />
                          {enumTranslations[p.paymentMethod]}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <BadgeDemo
                          type={p.status}
                          text={enumTranslations[p.status]}
                        />
                        <BadgeDemo
                          type={p.type}
                          text={enumTranslations[p.type]}
                        />
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-between gap-4 border-t border-border/50 pt-3 sm:flex-col sm:items-end sm:justify-center sm:gap-2.5 sm:border-0 sm:pt-0 shrink-0">
                      <span className="text-xs font-medium text-muted-foreground bg-background/50 sm:bg-transparent px-2 py-1 sm:p-0 rounded-md border sm:border-0">
                        {formatDate(p.createdAt)}
                      </span>

                      <Link
                        to={`/dashboard/transactions/${p.id}?academyId=${academyId}`}
                        className="inline-flex items-center gap-1.5 justify-center rounded-lg border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-muted hover:text-foreground active:scale-[0.98]"
                      >
                        <RiEye2Fill className="h-3.5 w-3.5 opacity-80" />
                        التفاصيل
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
