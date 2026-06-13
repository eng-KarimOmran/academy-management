import type { UserAuth } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  user: UserAuth | null;
  setUser: (data: UserAuth | null) => void;
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
}));
