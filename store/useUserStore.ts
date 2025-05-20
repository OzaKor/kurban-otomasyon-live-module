import { User } from "@/types/user";
import axios from "@/lib/axios";
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type UserStore = {
  userToken: string | null;
  user: User | null;
  setUserToken: (userToken: string) => void;
  setUser: (user: User) => void;
  clear: () => void;
  fetchVerifyToken:  (token:string|null) => Promise<void>;
  logout: () => void;
}


const useUserStore=create<UserStore>()(
  persist(
    (set) => ({
      userToken: null,
      user: null,
      setUserToken: (userToken: string) => set({ userToken }),
      setUser: (user: User) => set({ user }),
      clear: () => set({ userToken: null, user: null }),
      fetchVerifyToken: async (token:string|null) => {
        console.log("store fetchVerifyToken token: ", token);
        if(!token){
          return;
        }
        const response = await axios.get("/api/auth/verify-token",{
          headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        set({ userToken: response.data.token });
      },
      logout: () => {
        set({ userToken: null, user: null });
      },
    }),
    {
      name: 'user-session', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useUserStore
