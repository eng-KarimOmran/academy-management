import type { Academy } from "./academy";
import type { JobProfileType, SupportType } from "./enums";

export interface JobProfile {
  id: string;
  userId: string;
  academyId: string;
  jobProfileType: JobProfileType
  isActive: boolean;
  baseSalary: number;
  lessonPrice: number;
  supportType: SupportType | null
  targetCount: number;
  bonusAmount: number;
  createdAt: string;
}

export interface JobProfileWithAcademy extends JobProfile {
  academy: Academy
}