import type { User } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (data: User | null) => void;
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
}));
