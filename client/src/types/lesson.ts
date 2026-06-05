import type { Academy } from "./academy";
import type { Area } from "./area";
import type { Captain } from "./captain";
import type { Car } from "./car";
import type { Client } from "./client";
import type {
  LessonStatus,
  PaymentMethod,
  Status,
  TransactionType,
  Transmission,
} from "./enums";

import type { User } from "./user";

export interface LessonBase {
  id: string;
  startTime: string;
  endTime: string;
  status: LessonStatus;
  transmission: Transmission;
  expectedAmount: number;
  subscriptionId: string;

  captain: Captain;
  car: Car;
  area: Area;
  client: Client;
  academy: Academy;
}

export interface LessonDetails extends LessonBase {
  carSessionPrice: number;
  captainLessonPrice: number;
  paymentTransaction: {
    id: string;
    amount: number;
    status: Status;
    paymentMethod: PaymentMethod;
    type: TransactionType;
    isRemitted: boolean;
    createdAt: string;
    receiver: User;
  } | null;
}
