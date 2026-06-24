// import { BadgeDemo } from "@/components/CustomBadge/CustomBadge";
// import { Button } from "@/components/ui/button";
// import { enumTranslations } from "@/lib/enumTranslations";
// import { formatDate } from "@/lib/utils";
// import { getPaymentTransactionDetails } from "@/service/ledgerTransactions.service";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect, type ReactNode } from "react";
// import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
// import { toast } from "sonner";

// type InfoItemProps = {
//   label: string;
//   value: ReactNode;
// };

// export default function TransactionDetailsPage() {
//   const { transactionId } = useParams();
//   const [searchParams] = useSearchParams();
//   const academyId = searchParams.get("academyId");

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["transactions", academyId, transactionId],
//     queryFn: () =>
//       getPaymentTransactionDetails({
//         academyId: academyId!,
//         transactionId: transactionId!,
//       }),
//     select: (res) => res.data.data,
//     enabled: !!academyId && !!transactionId,
//   });

//   useEffect(() => {
//     if (error) {
//       toast.error(error.message || "خطأ في تحميل المعاملة");
//     }
//   }, [error]);

//   if (!academyId || !transactionId) {
//     return <Navigate to={"/not-found"} />;
//   }

//   if (isLoading) {
//     return (
//       <div className="flex h-60 items-center justify-center text-muted-foreground">
//         جاري تحميل البيانات...
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="flex h-60 items-center justify-center text-muted-foreground">
//         لا يوجد بيانات لعرضها
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
//         <div className="space-y-1">
//           <h1 className="text-2xl font-bold">تفاصيل المعاملة المالية</h1>
//           <p className="text-sm text-muted-foreground">
//             تم إنشاء العملية بتاريخ {formatDate(data.createdAt, "datetime")}
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <BadgeDemo type={data.status} text={enumTranslations[data.status]} />
//           <Button asChild>
//             <Link
//               to={`/dashboard/subscription/${data.subscription.id}?academyId=${data.academy.id}`}
//             >
//               تفاصيل الأشتراك
//             </Link>
//           </Button>
//         </div>
//       </div>

//       {/* قسم المعلومات الأساسية */}
//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <InfoItem
//           label="طريقة الدفع"
//           value={enumTranslations[data.paymentMethod]}
//         />

//         <InfoItem
//           label="نوع المعاملة"
//           value={
//             <BadgeDemo type={data.type} text={enumTranslations[data.type]} />
//           }
//         />

//         <InfoItem
//           label="تاريخ العملية"
//           value={formatDate(data.createdAt, "datetime")}
//         />

//         <InfoItem
//           label="الحالة"
//           value={
//             <BadgeDemo
//               type={data.status}
//               text={enumTranslations[data.status]}
//             />
//           }
//         />
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <div className="flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm">
//           <div>
//             <div className="mb-6 flex items-center justify-between">
//               <h2 className="text-lg font-semibold">بيانات العميل</h2>
//               <Button variant="outline" size="sm" asChild>
//                 <Link
//                   to={`/dashboard/client/${data.client.id}?academyId=${data.academy.id}`}
//                 >
//                   عرض الملف
//                 </Link>
//               </Button>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
//                 {data.client.name[0]}
//               </div>
//               <div className="overflow-hidden">
//                 <h3 className="truncate text-lg font-semibold">
//                   {data.client.name}
//                 </h3>
//                 <p className="text-sm text-muted-foreground" dir="ltr">
//                   {data.client.phone}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 flex items-center gap-3 border-t pt-4">
//             <Button
//               variant="outline"
//               className="w-full gap-2 border-green-200 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
//               asChild
//             >
//               <a
//                 href={`https://wa.me/${data.client.phone}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 واتساب
//               </a>
//             </Button>
//           </div>
//         </div>

//         <div className="flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm">
//           <div>
//             <div className="mb-6 flex items-center justify-between">
//               <h2 className="text-lg font-semibold">بيانات المسؤول</h2>
//               <Button variant="outline" size="sm" asChild>
//                 <Link to={`/dashboard/user/${data.receiver.id}`}>
//                   عرض الملف
//                 </Link>
//               </Button>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-slate-500/10 text-xl font-bold text-slate-600">
//                 {data.receiver.name[0]}
//               </div>
//               <div className="overflow-hidden">
//                 <h3 className="truncate text-lg font-semibold">
//                   {data.receiver.name}
//                 </h3>
//                 <p className="text-sm text-muted-foreground" dir="ltr">
//                   {data.receiver.phone}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex items-center gap-3 border-t pt-4">
//             <Button
//               variant="outline"
//               className="w-full gap-2 border-green-200 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
//               asChild
//             >
//               <a
//                 href={`https://wa.me/${data.receiver.phone}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 واتساب
//               </a>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoItem({ label, value }: InfoItemProps) {
//   return (
//     <div className="rounded-lg border p-4">
//       <p className="mb-1 text-sm text-muted-foreground">{label}</p>
//       <div className="font-medium">{value}</div>
//     </div>
//   );
// }

export default function TransactionDetailsPage() {
  return (
    <div>TransactionDetailsPage</div>
  )
}
