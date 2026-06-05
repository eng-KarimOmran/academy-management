import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/utils";
import type { ClientSource } from "@/types/enums";
import { RiCalendarLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";

import studentAssets from "@/assets/student.png";

interface BasicInfoSectionProps {
  name: string;
  clientSource: ClientSource;
  phone: string;
  createdAt: string;
}

export default function BasicInfoSection({
  name,
  clientSource,
  phone,
  createdAt,
}: BasicInfoSectionProps) {
  const initial = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join(" ")
    .toUpperCase();

  const formatCreatedAt = formatDate(createdAt);

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = () => {
    const cleanPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/+2${cleanPhone}`, "_blank");
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-card shadow-sm">
      <header className="flex items-center gap-4 p-6 border-b bg-muted/20">
        <Avatar size="lg" className="size-20">
          <AvatarImage src={studentAssets} alt="student" />
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg tracking-tight text-foreground truncate">
            {name}
          </h3>
          <Badge>{enumTranslations[clientSource]}</Badge>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* معلومات التواصل */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3 w-full bg-muted/50 rounded-2xl p-4">
            <div className="mt-1 text-muted-foreground/70">
              <RiPhoneLine size={18} />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                الهاتف
              </span>
              <p className="text-sm font-semibold mt-0.5">{phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 w-full bg-muted/50 rounded-2xl p-4">
            <div className="mt-1 text-muted-foreground/70">
              <RiCalendarLine size={18} />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                تاريخ التسجيل
              </span>
              <p className="text-sm font-semibold mt-0.5">{formatCreatedAt}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={handleWhatsApp} variant="outline" className="w-full sm:w-1/2 h-12">
            <RiWhatsappLine size={18} />
            مراسلة واتساب
          </Button>

          <Button onClick={handleCall} className="w-full sm:w-1/2 h-12">
            <RiPhoneLine size={18} />
            اتصال هاتفي
          </Button>
        </div>
      </main>
    </div>
  );
}
