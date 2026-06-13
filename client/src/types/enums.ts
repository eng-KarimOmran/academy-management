export const RecordType = ["ADVANCE", "DEDUCTION", "REWARD"] as const;
export type RecordType = (typeof RecordType)[number];

export const Role = ["OWNER", "SECRETARY", "CAPTAIN"] as const;
export type Role = (typeof Role)[number];

export const Transmission = ["MANUAL", "AUTOMATIC"] as const;
export type Transmission = (typeof Transmission)[number];

export const TrainingSupport = ["MANUAL", "AUTOMATIC", "BOTH"] as const;
export type TrainingSupport = (typeof TrainingSupport)[number];

export const LessonStatus = [
  "SCHEDULED",
  "COMPLETED",
  "CANCELED",
  "CANCELED_CHARGED",
] as const;

export type LessonStatus = (typeof LessonStatus)[number];

export const ExpenseType = [
  "MARKETING",
  "MAINTENANCE",
  "UTILITIES",
  "RENT",
  "GENERAL",
] as const;
export type ExpenseType = (typeof ExpenseType)[number];

export const CancelReason = [
  "CHANGE_PROGRAM",
  "DOES_NOT_WANT_COURSE",
  "CAPTAIN_ISSUE",
  "MANAGEMENT_ISSUE",
  "ABSENCE_EXCEEDED",
  "OTHER",
] as const;

export type CancelReason = (typeof CancelReason)[number];

export const PaymentMethod = ["CASH", "ELECTRONIC_WALLET"] as const;
export type PaymentMethod = (typeof PaymentMethod)[number];

export const TransactionType = ["PAYMENT", "REFUND"] as const;
export type TransactionType = (typeof TransactionType)[number];

export const UserStatus = ["ACTIVE", "BANNED"] as const;
export type UserStatus = (typeof UserStatus)[number];

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

export const StatusInput = ["COMPLETED", "REJECTED"] as const;
export type StatusInput = (typeof Status)[number];

export const SubscriptionStatus = [
  "ACTIVE",
  "PAUSED",
  "COMPLETED",
  "CANCELED",
  "FULLYBOOKED",
] as const;

export type SubscriptionStatus = (typeof SubscriptionStatus)[number];

export const ClientSource = ["PLATFORM", "OFFICE"] as const;
export type ClientSource = (typeof ClientSource)[number];
