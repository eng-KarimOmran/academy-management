import type { SupportType } from "./enums";

interface User {
  id: string;
  name: string;
  phone: string;
};

export interface Captain {
  id: string;
  isActive: boolean;
  captainLessonPrice: number;
  supportType: SupportType;
  createdAt: string;
  baseSalary: string
  academyId: string
  user:User
}