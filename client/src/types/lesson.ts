import type { LessonStatus, Transmission } from "./enums";

export interface Payout {
  id: string
  totalAmount: string,
  createdAt: string
}

export interface LessonBase {
  id: string;
  startTime: string;
  endTime: string;
  status: LessonStatus;
  transmission: Transmission;
  expectedAmount: number;
  subscriptionId: string;
  captainLessonPrice: number;
  carSessionPrice: number;

  payout: Payout | null;

  car: {
    id: string;
    modelName: string;
    plateNumber: string;
  };

  area: {
    id: string;
    name: string;
  };

  captain: {
    id: string;
    userId: string;
    user: {
      id: string;
      name: string;
      phone: string;
    };
  };

  client: {
    id: string;
    name: string;
    phone: string;
  };

  academy: {
    id: string;
    name: string;
    phone: string;
  };
}