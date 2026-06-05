import { Link } from "react-router-dom";
import { RiPhoneFill, RiWhatsappFill } from "@remixicon/react";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import { InfoSection } from "@/components/InfoSection/InfoSection";
import type { Subscription } from "@/types/subscription";

interface ClientInfoSectionProp {
  client: Subscription["client"];
}
export const ClientInfoSection = ({ client }: ClientInfoSectionProp) => (
  <InfoSection title="بيانات العميل">
    <div className="flex flex-col gap-4 p-1">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg border border-primary/20">
            {client.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-foreground leading-tight">
              {client.name}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm text-muted-foreground font-medium">
                {client.phone}
              </span>
              <CopyBtn text={client.phone} />
            </div>
          </div>
        </div>
        <Link
          to={`/dashboard/client/${client.id}?academyId=${client.academyId}`}
          className="text-xs font-semibold text-primary hover:underline bg-primary/20 px-3 py-2 rounded-lg transition-colors"
        >
          ملف العميل
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <a
          href={`tel:${client.phone}`}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-95 transition-all active:scale-95"
        >
          <RiPhoneFill size={18} /> <span>اتصال</span>
        </a>
        <a
          href={`https://wa.me/${client.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all active:scale-95 shadow-sm shadow-green-100"
        >
          <RiWhatsappFill size={18} /> <span>واتساب</span>
        </a>
      </div>
    </div>
  </InfoSection>
);
