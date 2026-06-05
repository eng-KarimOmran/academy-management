import type { Academy } from "./academy";
import type { Area } from "./area";
import type { Client } from "./client";
import type { Course } from "./course";
import type { CancelReason, SubscriptionStatus, Transmission } from "./enums";
import type { LessonBase } from "./lesson";
import type { Payment } from "./transaction";
import type { User } from "./user";

interface SubscriptionCancellation {
  id: string;
  reason: CancelReason;
  createdAt: string;
  refundTransaction: unknown | null;
}

export interface SubscriptionBase {
  id: string;
  status: SubscriptionStatus;
  priceAtBooking: number;
  totalSessions: number;
  sessionDurationMinutes: number;
  createdAt: string;
  trainingTypeAtRegistration: Transmission;
  course: Course;
  client: Client;
  academy: Academy;
  area: Area;
}

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  priceAtBooking: number;
  totalSessions: number;
  sessionDurationMinutes: number;
  trainingTypeAtRegistration: Transmission;
  createdAt: string;

  createdBy: User;
  course: Course;
  client: Client;
  academy: Academy;
  area: Area;

  lessons: LessonBase[];
  payments: Payment[];

  cancellation: SubscriptionCancellation | null;
}
