import type { Platform } from "./enums";
import type { User } from "./user";

export interface SocialMediaLink {
  id: string;
  platform: Platform;
  url: string;
}

export interface Academy {
  id: string;
  name: string;
  createdAt: string;
}

export interface AcademyDetails extends Academy {
  socialMediaPlatforms: SocialMediaLink[];
  owners: User[];
}