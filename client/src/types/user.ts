import type { Academy } from "./academy";

export interface User {
  id: string;
  name: string;
  phone: string;
  isActive: boolean;
  email: string
  isPasswordChanged: boolean;
  isAdmin: boolean
  createdAt: string;
}

export interface UserDetails extends User {
  academies: Academy[]
}

export interface UserAuth {
  userId: string
  refresh: string,
  access: string
}
