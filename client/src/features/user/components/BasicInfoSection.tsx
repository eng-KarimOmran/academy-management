import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import type { User } from "../user.type";
import { formatDate } from "@/lib/formatDate";

import {
  RiFingerprintLine,
  RiMailLine,
  RiShieldCheckLine,
  RiCalendarLine,
  RiPhoneLine,
} from "@remixicon/react";

import {
  GetWhatsappLink,
  GetContactLink,
} from "@/components/GetPhoneLinks/GetPhoneLinks";

export default function BasicInfoSection({ user }: { user: User }) {
  const { name, email, phone, isActive, createdAt, id } = user;

  return (
    <div>
      <Card className="overflow-hidden">
        <CardTitle>
          <div className="w-full space-y-3 flex flex-col items-center pt-6">
            <div className="flex items-center justify-center bg-primary/10 text-primary size-14 rounded-full text-xl font-semibold">
              {name[0]}
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-semibold text-lg">{name}</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <RiPhoneLine className="size-4" />
                {phone}
              </span>
            </div>
          </div>
        </CardTitle>

        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
            <li className="bg-muted p-4 rounded-lg flex items-center gap-2">
              <RiFingerprintLine className="size-5 text-blue-500 shrink-0" />
              <span className="font-medium">معرف المستخدم</span>
              <span>:</span>
              <span className="text-xs text-muted-foreground truncate">
                {id.toUpperCase()}
              </span>
            </li>

            <li className="bg-muted p-4 rounded-lg flex items-center gap-2">
              <RiMailLine className="size-5 text-amber-500 shrink-0" />
              <span className="font-medium">الأيميل</span>
              <span>:</span>
              <span className="text-muted-foreground truncate">
                {email ?? "البريد الإلكتروني غير مسجل"}
              </span>
            </li>

            <li className="bg-muted p-4 rounded-lg flex items-center gap-2">
              <RiShieldCheckLine
                className={`size-5 shrink-0 ${
                  isActive ? "text-green-500" : "text-red-500"
                }`}
              />
              <span className="font-medium">حالة النشاط</span>
              <span>:</span>
              <span className={isActive ? "text-green-600" : "text-red-600"}>
                {isActive ? "نشط" : "موقوف"}
              </span>
            </li>

            <li className="bg-muted p-4 rounded-lg flex items-center gap-2">
              <RiCalendarLine className="size-5 text-purple-500 shrink-0" />
              <span className="font-medium">تاريخ الانضمام</span>
              <span>:</span>
              <span className="text-muted-foreground">
                {formatDate(createdAt, "date")}
              </span>
            </li>
          </ul>
        </CardContent>

        <CardFooter className="flex justify-center items-center gap-4 pb-6">
          <GetContactLink phone={phone} />
          <GetWhatsappLink phone={phone} />
        </CardFooter>
      </Card>
    </div>
  );
}
