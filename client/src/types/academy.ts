import type { Platform } from "./enums";
import type { User } from "./user";

// ==========================================
// Social Media
// ==========================================

export interface SocialMediaLink {
  id: string;
  platform: Platform;
  url: string;
  academyId: string;
}

// ==========================================
// Academy Base
// ==========================================

export interface Academy {
  id: string;
  name: string;
  phone: string;
  address: string;
  instaPay: string;
}

// ==========================================
// Academy Details
// ==========================================

export interface AcademyDetails extends Academy {
  createdAt: string;
  socialMediaPlatforms: SocialMediaLink[];
  owners: User[];
}
