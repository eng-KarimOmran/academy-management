import type {  CaptainBass } from "./captain";
import type { Role, UserStatus } from "./enums";
import type { Secretary } from "./secretary";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: Role;
  status: UserStatus;
}

export interface UserAuth extends User {
  isPasswordChanged: boolean;
}

export interface UserProfile extends User {
  captainProfile: CaptainBass | null;
  secretaryProfile: Secretary | null;
  createdAt: string;
}
