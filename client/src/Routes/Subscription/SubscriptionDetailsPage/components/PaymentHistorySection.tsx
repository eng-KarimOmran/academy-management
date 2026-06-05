import {
  RiMoneyDollarCircleLine,
  RiWallet3Line,
  RiCheckDoubleLine,
  RiBankCardLine,
} from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { enumTranslations } from "@/lib/enumTranslations";
import { InfoSection } from "@/components/InfoSection/InfoSection";
import { Button } from "@/components/ui/button";
import type { Subscription } from "@/types/subscription";
import type { CalculatePaymentSummary } from "@/lib/calculatePaymentSummary";
import AddTransaction from "@/Routes/Transaction/Forms/AddTransaction";
import { useDialogState } from "@/store/DialogState";

interface PaymentHistorySectionProp {
  payments: Subscription["payments"];
  priceAtBooking: number;
  paymentSummary: CalculatePaymentSummary;
  academyId: string;
  subscriptionId: string;
}

export const PaymentHistorySection = ({
  payments,
  priceAtBooking,
  paymentSummary,
  academyId,
  subscriptionId,
}: PaymentHistorySectionProp) => {
  const { setConfigDialog } = useDialogState();

  const addMoney = () => {
    setConfigDialog({
      title: "إضافة معاملة جديدة",
      description: "قم بإدخال بيانات المعاملة الجديدة.",
      children: (
        <AddTransaction subscriptionId={subscriptionId} academyId={academyId} />
      ),
    });
  };

  return (
    <InfoSection title="سجل المدفوعات">
      {/* كروت الملخص */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">
              إجمالي المطلوب
            </span>
            <span className="text-lg font-bold">{priceAtBooking} ج.م</span>
          </div>
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
            <RiMoneyDollarCircleLine size={24} />
          </div>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">
              إجمالي المدفوع
            </span>
            <span className="text-lg font-bold text-success">
              {paymentSummary.totalPaid} ج.م
            </span>
          </div>
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <RiWallet3Line size={24} />
          </div>
        </div>

        {/* كارت المبلغ المتبقي مع زر إضافة الأموال */}
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-2 ${paymentSummary.isFullyPaid ? "bg-green-100 border-green-200" : "bg-card border-orange-200"}`}
        >
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">
              المبلغ المتبقي
            </span>
            <span
              className={`text-lg font-bold ${paymentSummary.isFullyPaid ? "text-green-700" : "text-orange-600"}`}
            >
              {paymentSummary.remaining} ج.م
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* زر إضافة أموال يظهر فقط إذا كان المبلغ غير خالص */}
            {!paymentSummary.isFullyPaid && (
              <Button size="sm" onClick={addMoney} className="h-8">
                إضافة أموال
              </Button>
            )}
            <div
              className={`p-2 rounded-lg ${paymentSummary.isFullyPaid ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-600"}`}
            >
              {paymentSummary.isFullyPaid ? (
                <RiCheckDoubleLine size={24} />
              ) : (
                <RiMoneyDollarCircleLine size={24} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* قائمة المعاملات */}
      <div className="flex flex-col gap-3">
        {payments?.length > 0 ? (
          payments.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-background border border-border rounded-xl hover:shadow-sm transition-all gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <RiBankCardLine size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base flex items-center gap-2">
                    {payment.amount}
                    <span className="text-xs font-normal text-muted-foreground">
                      ج.م
                    </span>
                    {payment.isRemitted && (
                      <Badge
                        variant="success"
                        className="h-5 px-1.5 text-[10px]"
                      >
                        تم التوريد
                      </Badge>
                    )}
                  </h4>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground">
                    الوسيلة
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {enumTranslations[payment.paymentMethod] ||
                      payment.paymentMethod}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground">
                    الحالة
                  </span>
                  <Badge
                    variant={
                      payment.status === "COMPLETED"
                        ? "success"
                        : payment.status === "REJECTED"
                          ? "destructive"
                          : "warning"
                    }
                    className="text-xs"
                  >
                    {enumTranslations[payment.status] || payment.status}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground">
                    المُستلم
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-muted rounded-md">
                    {payment.receiver?.name || "---"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-muted/20 border border-dashed rounded-xl text-muted-foreground text-sm">
            لا توجد دفعات مسجلة
          </div>
        )}
      </div>
    </InfoSection>
  );
};
