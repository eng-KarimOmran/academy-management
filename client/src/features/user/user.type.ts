import type { Academy } from "@/types/academy";
import type { JobProfileWithAcademy } from "@/types/jobProfile";

export interface User {
    id: string;
    name: string;
    phone: string;
    isActive: boolean;
    email: string | null
    isPasswordChanged: boolean;
    isAdmin: boolean
    createdAt: string;
}

export interface UserWithAcademy extends User {
    academies: Academy[]
}

export interface UserProfile extends UserWithAcademy {
    jobProfile: JobProfileWithAcademy[]
}