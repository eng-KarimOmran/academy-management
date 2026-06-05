import type { TrainingSupport } from "./enums";
import type { User } from "./user";

export interface CaptainBass {
  id: string;
  isActive: boolean;
  captainLessonPrice: number;
  trainingType: TrainingSupport;
  createdAt: string;
}

export interface Captain extends CaptainBass {
  user: User;
}
