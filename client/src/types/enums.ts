export const Role = {
  OWNER: "OWNER",
  SECRETARY: "SECRETARY",
  CAPTAIN: "CAPTAIN",
  MANAGER: "MANAGER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const Transmission = {
  MANUAL: "MANUAL",
  AUTOMATIC: "AUTOMATIC",
} as const;

export type Transmission = (typeof Transmission)[keyof typeof Transmission];

export const SupportType = {
  MANUAL: "MANUAL",
  AUTOMATIC: "AUTOMATIC",
  BOTH: "BOTH",
} as const;

export type SupportType = (typeof SupportType)[keyof typeof SupportType];

export const LessonStatus = {
  SCHEDULED: "SCHEDULED",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
  CANCELED_CHARGED: "CANCELED_CHARGED",
} as const;

export type LessonStatus = (typeof LessonStatus)[keyof typeof LessonStatus];

export const PaymentMethod = {
  MONETARY: "MONETARY",
  ELECTRONIC: "ELECTRONIC",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const Platform = {
  FACEBOOK: "FACEBOOK",
  TIKTOK: "TIKTOK",
  INSTAGRAM: "INSTAGRAM",
  TWITTER: "TWITTER",
  YOUTUBE: "YOUTUBE",
  LINKEDIN: "LINKEDIN",
  SNAPCHAT: "SNAPCHAT",
  WHATSAPP: "WHATSAPP",
} as const;

export type Platform = (typeof Platform)[keyof typeof Platform];

export const LedgerTransactionStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type LedgerTransactionStatus =
  (typeof LedgerTransactionStatus)[keyof typeof LedgerTransactionStatus];

export const SubscriptionStatus = {
  PENDING_DEPOSIT: "PENDING_DEPOSIT",
  PENDING_FIRST_SESSION: "PENDING_FIRST_SESSION",
  GRACE_PERIOD: "GRACE_PERIOD",
  SUSPENDED: "SUSPENDED",
  ACTIVE: "ACTIVE",
  CANCELED: "CANCELED",
  COMPLETED: "COMPLETED",
} as const;

export type SubscriptionStatus =
  (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export const ClientSource = {
  PLATFORM: "PLATFORM",
  OFFICE: "OFFICE",
} as const;

export type ClientSource = (typeof ClientSource)[keyof typeof ClientSource];

export const LedgerEffect = {
  CREDIT: "CREDIT",
  DEBIT: "DEBIT",
} as const;

export type LedgerEffect = (typeof LedgerEffect)[keyof typeof LedgerEffect];

export const ReferenceCategory = {
  LESSON: "lessonId",
  PAYMENT: "paymentId",
  LEDGER: "ledgerId",
  SUBSCRIPTION: "subscriptionId",
} as const;

export type ReferenceCategory =
  (typeof ReferenceCategory)[keyof typeof ReferenceCategory];

export const TransactionType = {
  CUSTOMER_PAYMENT: "CUSTOMER_PAYMENT",
  CUSTOMER_REFUND: "CUSTOMER_REFUND",
  EMPLOYEE_TRANSFER_TO_EMPLOYEE: "EMPLOYEE_TRANSFER_TO_EMPLOYEE",
  EMPLOYEE_TRANSFER_TO_ACADEMY: "EMPLOYEE_TRANSFER_TO_ACADEMY",
  ACADEMY_TRANSFER_TO_EMPLOYEE: "ACADEMY_TRANSFER_TO_EMPLOYEE",
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export const TransactionParty = {
  ACADEMY: "ACADEMY",
  USER: "USER",
  SUBSCRIPTION: "SUBSCRIPTION",
} as const;

export type TransactionParty =
  (typeof TransactionParty)[keyof typeof TransactionParty];