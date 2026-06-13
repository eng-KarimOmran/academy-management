import type { TrainingSupport } from "./enums";

export interface Captain {
  id: string;
  isActive: boolean;
  captainLessonPrice: number;
  trainingType: TrainingSupport;
  createdAt: string;
  user: {
    id: string;
    name: string;
    phone: string;
  };
}