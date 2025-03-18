import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  id: string;
  role?: string;
  name? : string,
  isVerified? : boolean;
  username?: string;
  email?: string;
  bannerImage?: string | null;
  isProfileCompleted?: boolean;
  isCardCreated? : string; 
  isWaitlisted? : string
  token?: string;
  profileImage?: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }), // ✅ Fix: Removed async here
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
