import type { SubscriptionStatus, Transmission } from "./enums";
import type { LedgerTransaction } from "./ledgerTransaction";
import type { LessonBase } from "./lesson";

export interface SubscriptionBase {
  id: string;
  status: SubscriptionStatus;
  priceAtBooking: number;
  totalSessions: number;
  trainingTypeAtRegistration: Transmission;
  sessionDurationMinutes: number;
  createdAt: string;

  area: {
    id: string;
    name: string;
  };

  client: {
    id: string;
    name: string;
    phone: string;
    academyId: string;
  };

  course: {
    id: string;
    name: string;
  };

  academy: {
    id: string;
    name: string;
  };
}

export interface SubscriptionLesson extends SubscriptionBase {
  lessons: LessonBase[];
}

export interface SubscriptionDetails {
  subscription: SubscriptionLesson
  ledgerTransactions: LedgerTransaction[];
}