export interface Course {
  id: string;
  name: string;
  priceDiscounted?: number;
  totalSessions: number;
  isActive: boolean;
  academyId: string;
}

export interface CourseDetails extends Course {
  description: string;

  priceOriginal: number;

  practicalSessions: number;

  sessionDurationMinutes: number;

  trainingDetails: string[];

  featuredReason: string | null;
}
