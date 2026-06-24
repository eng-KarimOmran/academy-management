import type { Role, SupportType } from "./enums";

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
    supportType: SupportType;
    createdAt: string
    academyId: string;
    baseSalary: string,
  } | null;
  secretaryProfile: {
    id: string;
    baseSalary: number;
    targetCount: number;
    bonusAmount: number;
    createdAt: string;
    academyId: string;
  } | null;
}