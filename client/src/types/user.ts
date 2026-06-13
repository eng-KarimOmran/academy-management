import type { Role, TrainingSupport } from "./enums";

export interface User {
  id: string;
  name: string;
  phone: string;
  roles: Role[];
  isActive: boolean;
}

export interface UserAuth extends User {
  isPasswordChanged: boolean;
}

export interface UserProfile extends User {
  createdAt: string;
  captainProfile: {
    id: string;
    captainLessonPrice: number;
    isActive: boolean;
    trainingType: TrainingSupport;
    createdAt:string
  } | null;
  secretaryProfile: {
    id: string;
    baseSalary: number;
    targetCount: number;
    bonusAmount: number;
    createdAt: string;
  } | null;
}