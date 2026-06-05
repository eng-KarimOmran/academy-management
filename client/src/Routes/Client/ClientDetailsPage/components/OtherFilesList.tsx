import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { ClientDetails } from "@/types/client";
import {
  RiArrowLeftLine,
  RiBuilding4Line,
  RiPhoneLine,
} from "@remixicon/react";

export default function OtherFilesList({
  otherFiles,
}: {
  otherFiles: ClientDetails["otherFiles"];
}) {
  if (!otherFiles || otherFiles.length === 0) return null;

  return (
    <div className="space-y-8">
      {otherFiles && otherFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 px-1">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            ملفات أخرى
          </h3>

          <ul className="flex flex-col gap-4">
            {otherFiles.map((file) => (
              <li
                key={file.id}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-card p-5 rounded-2xl border border-border shadow-sm transition-all hover:shadow-md hover:border-primary/30"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* أيقونة الأكاديمية */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <RiBuilding4Line size={24} />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-base text-foreground leading-none tracking-tight">
                      {file.academy.name}
                    </h4>

                    {/* الهاتف */}
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground justify-start">
                      <RiPhoneLine size={16} className="text-primary/70" />
                      <span
                        className="font-mono font-medium tracking-wide"
                        dir="ltr"
                      >
                        {file.academy.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* زر الانتقال */}
                <div className="w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto h-11 px-6 rounded-xl font-bold gap-2 bg-background hover:bg-secondary transition-all active:scale-95"
                  >
                    <Link
                      to={`/dashboard/client/${file.id}?academyId=${file.academy.id}`}
                    >
                      عرض الملف
                      <RiArrowLeftLine
                        size={18}
                        className="text-muted-foreground transition-transform group-hover:-translate-x-1"
                      />
                    </Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
