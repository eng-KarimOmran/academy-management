import type { Header } from "@/components/Table/HeaderTable";
import type { Course } from "@/types/course";
import ShowMore from "@/components/ShowMore/ShowMore";

export const columns: Header<Course>[] = [
  {
    key: "name",
    header: "اسم الكورس",
    display: (data) => <ShowMore text={data.name} columns={10} />,
  },

  {
    key: "description",
    header: "الوصف",
    display: (data) => <ShowMore text={data.description} columns={10} />,
  },

  {
    key: "priceOriginal",
    header: "السعر",
    display: (data) => (
      <span className="text-xs bg-muted px-2 py-1 rounded">
        {data.priceOriginal} جنيه
      </span>
    ),
  },

  {
    key: "priceDiscounted",
    header: "السعر بعد الخصم",
    display: (data) =>
      data.priceDiscounted ? (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          {data.priceDiscounted} جنيه
        </span>
      ) : (
        "-"
      ),
  },

  {
    key: "totalSessions",
    header: "إجمالي الحصص",
    display: (data) => <span>{data.totalSessions}</span>,
  },
  {
    key: "sessionsBeforeFullPayment",
    header: "حصص قبل السداد",
    display: (data) => <span>{data.sessionsBeforeFullPayment}</span>,
  },
  {
    key: "requiredInitialDeposit",
    header: "الحد الأدنى للديبوزت",
    display: (data) => <span>{data.requiredInitialDeposit}</span>,
  },

  {
    key: "sessionDurationMinutes",
    header: "مدة الحصة",
    display: (data) => <span>{data.sessionDurationMinutes} دقيقة</span>,
  },

  {
    key: "isActive",
    header: "الحالة",
    display: (data) =>
      data.isActive ? (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          نشط
        </span>
      ) : (
        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
          غير نشط
        </span>
      ),
  },
];
