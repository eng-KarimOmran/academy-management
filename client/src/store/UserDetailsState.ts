import type { UserDetails } from "@/types/user";
import { create } from "zustand";

interface UserDetailsState {
  userDetails: UserDetails | null;
  setUserDetails: (data: UserDetails | null) => void;
}

export const useUserDetailsState = create<UserDetailsState>((set) => ({
  userDetails: null,
  setUserDetails: (data) => set({ userDetails: data }),
}));
