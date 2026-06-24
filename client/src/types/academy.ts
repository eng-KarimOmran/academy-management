import type { Platform } from "./enums";

export interface SocialMediaLink {
  id: string;
  platform: Platform;
  url: string;
}

export interface Owners {
  id: string;
  name: string;
  phone: string;
}

export interface Academy {
  id: string;
  name: string;
  phone: string;
  address: string;
  paymentLink: string;
  createdAt: string;
}

export interface AcademyDetails extends Academy {
  socialMediaPlatforms: SocialMediaLink[];
  owners: Owners[];
}