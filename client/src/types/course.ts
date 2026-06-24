export interface Course {
  id: string;
  name: string;
  description: string;
  featuredReason: string | null;
  isActive: boolean;
  sessionDurationMinutes: number;
  priceDiscounted: number;
  priceOriginal: number;
  totalSessions: number;
  requiredInitialDeposit: number
  sessionsBeforeFullPayment: number
  academyId: string;
  createdAt: string;
}

export interface CourseFeatures {
  id: string;
  text: string;
}

export interface CourseDetails extends Course {
  courseFeatures: CourseFeatures[];
}
