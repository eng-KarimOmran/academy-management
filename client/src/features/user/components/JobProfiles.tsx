import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import type { UserProfile } from "../user.type";
import { enumTranslations } from "@/lib/enumTranslations";
import { formatDate } from "@/lib/formatDate";

import {
  RiBuildingLine,
  RiBriefcaseLine,
  RiMoneyDollarCircleLine,
  RiGiftLine,
  RiShieldCheckLine,
  RiCalendarLine,
  RiFingerprintLine,
  RiPriceTag3Line,
  RiCustomerService2Line,
  RiFocus3Line,
} from "@remixicon/react";

export default function JobProfiles({
  jobProfiles,
}: {
  jobProfiles: UserProfile["jobProfile"];
}) {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {jobProfiles.map((j) => (
        <li key={j.id}>
          <Card className="h-full">
            <CardTitle className="flex items-center justify-between gap-2 px-6 pt-4">
              <span className="flex items-center gap-2 font-semibold">
                <RiBuildingLine className="size-5 text-blue-500" />
                {j.academy.name}
              </span>
              <span className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                <RiBriefcaseLine className="size-4" />
                {enumTranslations[j.jobProfileType]}
              </span>
            </CardTitle>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <RiMoneyDollarCircleLine className="size-5 text-emerald-500 shrink-0" />
                <span className="font-medium">الراتب الأساسي</span>
                <span>:</span>
                <span className="text-muted-foreground">{j.baseSalary}</span>
              </div>

              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <RiGiftLine className="size-5 text-pink-500 shrink-0" />
                <span className="font-medium">المكافأة</span>
                <span>:</span>
                <span className="text-muted-foreground">{j.bonusAmount}</span>
              </div>

              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <RiPriceTag3Line className="size-5 text-amber-500 shrink-0" />
                <span className="font-medium">سعر الحصة</span>
                <span>:</span>
                <span className="text-muted-foreground">{j.lessonPrice}</span>
              </div>

              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <RiCustomerService2Line className="size-5 text-indigo-500 shrink-0" />
                <span className="font-medium">نوع الدعم</span>
                <span>:</span>
                <span className="text-muted-foreground">
                  {j.supportType
                    ? enumTranslations[j.supportType]
                    : "غير معروف"}
                </span>
              </div>

              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <RiFocus3Line className="size-5 text-orange-500 shrink-0" />
                <span className="font-medium">الهدف المستهدف</span>
                <span>:</span>
                <span className="text-muted-foreground">{j.targetCount}</span>
              </div>

              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <RiCalendarLine className="size-5 text-purple-500 shrink-0" />
                <span className="font-medium">تاريخ الإنشاء</span>
                <span>:</span>
                <span className="text-muted-foreground">
                  {formatDate(j.createdAt, "date")}
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between px-6 pb-4">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <RiFingerprintLine className="size-4" />
                {j.id.toUpperCase()}
              </span>
              <span
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  j.isActive
                    ? "bg-green-500/10 text-green-600"
                    : "bg-red-500/10 text-red-600"
                }`}
              >
                <RiShieldCheckLine className="size-4" />
                {j.isActive ? "نشط" : "موقوف"}
              </span>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
