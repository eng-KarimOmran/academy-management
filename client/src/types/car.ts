import type { Transmission } from "./enums";

export interface Car {
  id: string;
  modelName: string;
  plateNumber: string;
  gearType: Transmission;
  carSessionPrice: number;
  isActive: boolean;
  createdAt: string;
}
