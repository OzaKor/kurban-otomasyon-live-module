import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";

interface UserStore {
  userToken: string | null;
  user: User | null;
  setUserToken: (userToken: string) => void;
  setUser: (user: User) => void;
  clear: () => void;
}

// Başlangıç değerleri
const initialState = {
  userToken: null,
  user: null,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUserToken: (userToken) => set({ userToken }),
      setUser: (user) => set({ user }),
      clear: () => set(initialState),
    }),
    {
      name: "user-storage", // localStorage'ta kullanılacak key
      storage: createJSONStorage(() => localStorage), // Sadece client-side'da çalışacak
    }
  )
);

// Client-side kontrolü yaparak kullanım
export const getStoredUser = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("user-storage");
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};