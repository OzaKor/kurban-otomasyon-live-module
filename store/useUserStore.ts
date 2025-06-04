import { User } from "@/types/user";
import axios from "@/lib/axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  userToken: string | null;
  user: User | null;
  setUserToken: (token: string) => void;
  setTokenClear: () => void;
  setUser: (user: User) => void;
  clear: () => void;
  fetchVerifyToken: (token: string | null) => Promise<void>;
  logout: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userToken: null,
      user: null,
      setUserToken: (token: string) => set({ userToken: token }),
      setTokenClear: () => set({ userToken: null }),
      setUser: (user: User) => set({ user }),
      clear: () => set({ userToken: null, user: null }),
      fetchVerifyToken: async (token: string | null) => {
        if (!token) {
          return;
        }

        await axios.get("/api/auth/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      },
      logout: () => {
        set({ userToken: null, user: null });
      },
    }),
    {
      name: "user-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
