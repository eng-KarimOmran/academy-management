// import ButtonAdd from "@/components/Table/ButtonAdd";

// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { enumTranslations } from "@/lib/enumTranslations";
// import type { UserAccountSummary } from "@/types/ledgerTransaction";
// import AddLedgerForm from "../Form/AddLedgerForm";

// export default function UserAccountCard({
//   data,
//   academyId,
// }: {
//   data: UserAccountSummary;
//   academyId: string;
// }) {
//   const { id, name, phone, summary } = data;
//   const configDialogAdd = {
//     title: "إضافة معاملة جديدة",
//     description: "قم بإدخال بيانات المعاملة الجديدة.",
//     children: <AddLedgerForm collectedAmount={data.summary.collectedAmount} academyId={academyId} userId={id} />,
//   };
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{name}</CardTitle>
//         <CardDescription>{phone}</CardDescription>
//         <CardAction>
//           <ButtonAdd textBtn="اضافة معاملة" configDialogAdd={configDialogAdd} />
//         </CardAction>
//       </CardHeader>
//       <CardContent>
//         <ul className="space-y-4">
//           {Object.entries(summary.categoryCounts).map(([key, value]) => (
//             <li key={`${id}-${key}`}>
//               <div className="flex items-center justify-between text-sm py-2">
//                 <span>
//                   {enumTranslations[key as keyof typeof enumTranslations]}
//                 </span>
//                 <span className="font-semibold">{value}</span>
//               </div>
//               <Separator />
//             </li>
//           ))}
//         </ul>
//       </CardContent>
//       <CardFooter className="flex justify-between items-center">
//         <div className="flex items-center gap-1">
//           <span>له / مستحق له :</span>
//           <span
//             className={`${summary.userBalance > 0 ? "text-green-500" : "text-red-500"}`}
//           >
//             {summary.userBalance}
//           </span>
//           <span>ج.م</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <span>مدين / مستحق عليه :</span>
//           <span className="text-red-500">{summary.collectedAmount}</span>
//           <span>ج.م</span>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

export default function UserAccountCard() {
  return (
    <div>UserAccountCard</div>
  )
}
