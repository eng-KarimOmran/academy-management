import type { LessonStatus, Transmission } from "./enums";

export interface LessonBase {
  id: string;
  startTime: string;
  endTime: string;
  status: LessonStatus;
  transmission: Transmission;
  expectedAmount: number;
  subscriptionId: string;
  isPaid: boolean;
  captainLessonPrice: number;
  carSessionPrice: number;
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