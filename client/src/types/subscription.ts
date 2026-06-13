import type {
  LessonStatus,
  PaymentMethod,
  Status,
  SubscriptionStatus,
  TransactionType,
  Transmission,
} from "./enums";

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

export interface SubscriptionDetails extends SubscriptionBase {
  payments: {
    id: string;
    amount: number;
    paymentMethod: PaymentMethod;
    type: TransactionType;
    status: Status;
    createdAt: string;
    receiver: {
      id: string;
      name: string;
      phone: string;
    };
  }[];
  lessons: {
    id: string;
    startTime: string;
    endTime: string;
    status: LessonStatus;
    transmission: Transmission;
    expectedAmount: number | null;
    area: {
      id: string;
      name: string;
    };
    captain: {
      id: string;
      user: { id: string; name: string; phone: string };
    };
  }[];
}
