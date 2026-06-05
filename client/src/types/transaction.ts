import type { Academy } from "./academy";
import type { PaymentMethod, Status, TransactionType } from "./enums";
import type { LessonBase } from "./lesson";
import type { SubscriptionBase } from "./subscription";
import type { User } from "./user";

export interface Payment {
  id: string;
  amount: number;
  isRemitted: boolean;
  createdAt: string;

  status: Status;
  paymentMethod: PaymentMethod;
  type: TransactionType;

  receiver: User;
  academy: Academy;
  lesson: LessonBase | null;
  subscription: SubscriptionBase;
}

