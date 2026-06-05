import type { TrainingSupport } from "./enums";

export interface Area {
  id: string;
  name: string;
  supportType: TrainingSupport;
  isActive: boolean;
  createdAt: string;
}
