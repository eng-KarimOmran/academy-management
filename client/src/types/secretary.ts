import type { User } from "./user";

export interface Secretary {
  id: string;
  baseSalary: number;
  targetCount: number;
  bonusAmount: number;
  user: User;
}