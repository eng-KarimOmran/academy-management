import type { SubscriptionStatus, Transmission } from "./enums";
import type { LedgerTransaction } from "./ledgerTransaction";
import type { LessonBase } from "./lesson";

export interface SubscriptionBase {
  id: string;
  subscriptionStatus: SubscriptionStatus;

  priceAtBooking: number;
  totalSessions: number;
  sessionDurationMinutes: number;

  requiredInitialDeposit: number;
  sessionsBeforeFullPayment: number;

  trainingTypeAtRegistration: Transmission;

  courseName: string

  clientId: string;
  courseId: string;
  academyId: string;
  areaId: string;

  payrollId: string | null;
  createdById: string | null;

  createdAt: string;
}

export interface SubscriptionLesson extends SubscriptionBase {
  lessons: LessonBase[];
}

export interface SubscriptionDetails {
  subscription: SubscriptionLesson
  ledgerTransactions: LedgerTransaction[];
}