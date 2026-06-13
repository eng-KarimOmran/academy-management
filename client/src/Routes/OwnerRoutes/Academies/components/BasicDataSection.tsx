import {
  RiSchoolFill,
  RiPhoneFill,
  RiRoadMapLine,
  RiWalletLine,
  RiEditLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import type { AcademyDetails } from "@/types/academy";
import ShowMore from "@/components/ShowMore/ShowMore";
import { useIsMobile } from "@/hooks/use-mobile";

export default function BasicDataSection({
  academy,
  onEdit,
}: {
  academy: AcademyDetails;
  onEdit: () => void;
}) {
  const isMobile = useIsMobile();

  const basicData = [
    { label: "اسم الأكاديمية", value: academy.name, icon: <RiSchoolFill /> },
    { label: "رقم الهاتف", value: academy.phone, icon: <RiPhoneFill /> },
    { label: "العنوان", value: academy.address, icon: <RiRoadMapLine /> },
    { label: "رابط الدفع", value: academy.paymentLink, icon: <RiWalletLine /> },
  ];

  return (
    <div className="bg-card border rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            {academy.name}
          </h2>
          <p className="text-muted-foreground text-sm">
            البيانات الأساسية للأكاديمية
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={onEdit}>
          <RiEditLine size={18} /> تعديل البيانات
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {basicData.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-background shadow-sm rounded-lg text-primary shrink-0">
              {item.icon}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm text-muted-foreground mb-0.5">
                {item.label}
              </p>
              <p className="font-semibold text-base md:text-lg truncate">
                {isMobile ? <ShowMore text={item.value} /> : item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
