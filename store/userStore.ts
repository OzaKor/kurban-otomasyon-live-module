import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";
import axios from "@/lib/axios";

interface UserStore {
  userToken: string | null;
  user: User | null;
  setUserToken: (userToken: string) => void;
  setUser: (user: User) => void;
  clear: () => void;
  fetchVerifyToken: () => void;
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
      fetchVerifyToken: () => {
        console.log("fetchVerifyToken");

        const storedData = localStorage.getItem("user-storage");
        const parsedData = storedData ? JSON.parse(storedData) : null;
        const userToken = parsedData?.state?.userToken;

        if (userToken) {
          axios
            .get(`api/auth/verify-token`, {
              headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
            })
            .then(() => {
              // Token geçerli, herhangi bir işlem yapmaya gerek yok
              console.log("Token geçerli");
            })
            .catch((error) => {
              
              if (error.response?.status === 401) {
                // 401 Unauthorized hatası durumunda kullanıcıyı çıkış yaptır
                useUserStore.getState().clear();
              }

              if (error.response?.status === 403) {
                // 403 Forbidden hatası durumunda kullanıcıyı çıkış yaptır
                useUserStore.getState().clear();
              }

              if (error.response?.status === 500) {
                // 500 Internal Server Error hatası durumunda kullanıcıyı çıkış yaptır
                useUserStore.getState().clear();
              }

              console.error("Token doğrulama hatası:", error);
            });
        }
      },
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
