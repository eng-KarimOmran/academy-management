// import { getAcademyAccounts } from "@/service/accounts.service";
// import { useActiveAcademyState } from "@/store/ActiveAcademyState";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import UserAccountCard from "./components/UserAccountCard";
// import type { DateFormProps } from "../Dashboard/forms/DateForm";
// import dayjs from "dayjs";
// import { Button } from "@/components/ui/button";
// import DateForm from "../Dashboard/forms/DateForm";
// import { useDialogState } from "@/store/DialogState";

// export default function Accounts() {
//   const { activeAcademy } = useActiveAcademyState();
//   const { setConfigDialog } = useDialogState();

//   const academyId = activeAcademy?.id;
//   const startDate = dayjs()
//     .subtract(1, "month")
//     .date(28)
//     .startOf("day")
//     .toISOString();

//   const endDate = dayjs().date(28).startOf("day").toISOString();

//   const [date, setDate] = useState<DateFormProps>({
//     startDate,
//     endDate,
//   });

//   const {
//     data = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["ledgers", academyId, date.startDate, date.endDate],
//     queryFn: () =>
//       getAcademyAccounts({
//         academyId: academyId!,
//         to: date.endDate,
//         from: date.startDate,
//       }),
//     select: (res) => res.data?.data ?? [],
//     enabled: !!academyId,
//   });

//   useEffect(() => {
//     if (error) {
//       toast.error(error.message || "خطأ في تحميل البيانات");
//     }
//   }, [error]);

//   if (isLoading) {
//     return <div>جاري التحميل...</div>;
//   }

//   return (
//     <div>
//       <div className="flex items-center gap-2 py-5">
//         <Button
//           onClick={() => {
//             setConfigDialog({
//               title: "حدد الفترة الزمنية",
//               description: "قم بتحديد الفترة الزمنية",
//               children: <DateForm setDate={setDate} date={date} />,
//             });
//           }}
//         >
//           تعيين فلتر
//         </Button>
//         <Button
//           onClick={() => {
//             setDate({ startDate, endDate });
//           }}
//         >
//           مسح الفلتر
//         </Button>
//       </div>
//       <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data.map((a) => (
//           <li key={a.id}>
//             <UserAccountCard academyId={academyId ?? ""} data={a} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default function Accounts() {
  return (
    <div>Accounts</div>
  )
}
