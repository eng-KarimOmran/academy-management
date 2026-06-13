import type { Platform } from "./enums";

export interface SocialMediaLink {
  id: string;
  platform: Platform;
  url: string;
  academyId: string;
}

export interface Academy {
  id: string;
  name: string;
  phone: string;
  address: string;
  paymentLink: string;
}

export interface AcademyDetails extends Academy {
  createdAt: string;
  socialMediaPlatforms: SocialMediaLink[];
  owners: {
    id: string;
    name: string;
    phone: string;
  }[];
}
