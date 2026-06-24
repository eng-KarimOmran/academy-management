export const Role = {
  OWNER: 'OWNER',
  SECRETARY: 'SECRETARY',
  CAPTAIN: 'CAPTAIN',
  MANAGER: 'MANAGER'
} as const

export type Role = (typeof Role)[keyof typeof Role]

export const Transmission = ["MANUAL", "AUTOMATIC"] as const;
export type Transmission = (typeof Transmission)[number];

export const SupportType = ["MANUAL", "AUTOMATIC", "BOTH"] as const;
export type SupportType = (typeof SupportType)[number];

export const LessonStatus = [
  "SCHEDULED",
  "COMPLETED",
  "CANCELED",
  "CANCELED_CHARGED",
] as const;

export type LessonStatus = (typeof LessonStatus)[number];

export const PaymentMethod = ["CASH", "ELECTRONIC_WALLET"] as const;
export type PaymentMethod = (typeof PaymentMethod)[number];

export const Platform = [
  "FACEBOOK",
  "INSTAGRAM",
  "TIKTOK",
  "YOUTUBE",
  "WHATSAPP",
  "WEBSITE",
  "GMAIL",
] as const;
export type Platform = (typeof Platform)[number];

export const Status = ["PENDING", "COMPLETED", "REJECTED"] as const;
export type Status = (typeof Status)[number];

export const SubscriptionStatus = [
  "PENDING_DEPOSIT",
  "ACTIVE_LIMITED",
  "ACTIVE",
  "CANCELED",
  "COMPLETED",
] as const;

export type SubscriptionStatus = (typeof SubscriptionStatus)[number];

export const ClientSource = ["PLATFORM", "OFFICE"] as const;
export type ClientSource = (typeof ClientSource)[number];

export const LedgerEffect = [
  "CREDIT",
  "DEBIT",
] as const;

export type LedgerEffect = (typeof LedgerEffect)[number];
export const ReferenceCategory = [
  "lessonId",
  "paymentId",
  "ledgerId",
  "subscriptionId",
] as const;

export const TransactionType = {
  PAYMENT: 'PAYMENT',
  REFUND: 'REFUND',
  TRANSFER: 'TRANSFER'
} as const

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]

export const TransactionParty = {
  ACADEMY: 'ACADEMY',
  USER: 'USER',
  SUBSCRIPTION: 'SUBSCRIPTION'
} as const

export type TransactionParty = (typeof TransactionParty)[keyof typeof TransactionParty]

export type ReferenceCategory = (typeof ReferenceCategory)[number];