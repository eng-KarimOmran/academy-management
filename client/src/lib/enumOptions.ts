import * as Enums from "@/types/enums";
import { enumTranslations } from "./enumTranslations";

export const createOptions = <T extends Record<string, keyof typeof enumTranslations>>(obj: T) => {
    return Object.values(obj).map((value) => ({ label: enumTranslations[value], value }));
}

export const jobProfileTypeOptions = createOptions(Enums.JobProfileType);
export const transmissionOptions = createOptions(Enums.Transmission);
export const supportTypeOptions = createOptions(Enums.SupportType);
export const lessonStatusOptions = createOptions(Enums.LessonStatus);
export const paymentMethodOptions = createOptions(Enums.PaymentMethod);
export const platformOptions = createOptions(Enums.Platform);
export const ledgerTransactionStatusOptions = createOptions(Enums.LedgerTransactionStatus);
export const subscriptionStatusOptions = createOptions(Enums.SubscriptionStatus);
export const clientSourceOptions = createOptions(Enums.ClientSource);
export const ledgerEffectOptions = createOptions(Enums.LedgerEffect);
export const referenceCategoryOptions = createOptions(Enums.ReferenceCategory);
export const transactionTypeOptions = createOptions(Enums.TransactionType);
export const transactionPartyOptions = createOptions(Enums.TransactionParty);