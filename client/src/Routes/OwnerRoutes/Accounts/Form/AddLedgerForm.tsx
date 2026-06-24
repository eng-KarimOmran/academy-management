// import Form, { type FormProps } from "@/components/Form/Form";
// import type { CreateLedgerDto } from "@/DTOs/ledgerTransactions.dto";
// import { enumTranslations } from "@/lib/enumTranslations";
// import { queryClient } from "@/lib/queryClient";
// import { createLedger } from "@/service/accounts.service";
// import { useDialogState } from "@/store/DialogState";
// import { LedgerCategory } from "@/types/enums";
// import type { Ledger } from "@/types/ledgerTransaction";
// import { CreateLedgerSchema } from "@/validations/ledgers.validation";
// import { toast } from "sonner";

// export default function AddLedgerForm({
//   academyId,
//   userId,
//   collectedAmount,
// }: {
//   academyId: string;
//   userId: string;
//   collectedAmount: number;
// }) {
//   const { setConfigDialog } = useDialogState();

//   const config: FormProps<CreateLedgerDto, Ledger> = {
//     inputs: [
//       {
//         name: "amount",
//         type: "number",
//         label: "المبلغ",
//         col: "half",
//       },
//       {
//         name: "category",
//         type: "select",
//         label: "ناقل الحركة",
//         placeholder: "اختر نوع الناقل",
//         options: LedgerCategory.map((t) => ({
//           label: enumTranslations[t] || t,
//           value: t,
//         })),
//         col: "half",
//       },
//       {
//         name: "notes",
//         type: "textarea",
//         label: "ملاحظة",
//         placeholder: "مثال: خصم تأخير",
//       },
//     ],

//     defaultValues: {
//       academyId,
//       userId,
//       category: "TO_ACADEMY",
//       amount: collectedAmount,
//       notes: "",
//     },

//     schema: CreateLedgerSchema,

//     submitButton: {
//       text: "إضافة المعاملة",
//       loadingText: "جاري الإضافة...",
//     },

//     service: (data) => createLedger(data),

//     onSuccess: () => {
//       toast.success("تم إضافة المعاملة بنجاح");
//       queryClient.invalidateQueries({ queryKey: ["ledgers", academyId] });
//       setConfigDialog(null);
//     },
//   };

//   return <Form {...config} />;
// }

export default function AddLedgerForm() {
  return (
    <div>AddLedgerForm</div>
  )
}
