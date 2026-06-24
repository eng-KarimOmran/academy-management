import type { SupportType } from "./enums";

export interface Area {
  id: string;
  name: string;
  supportType: SupportType;
  isActive: boolean;
  createdAt: string;
}