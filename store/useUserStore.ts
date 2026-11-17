import { User, VerifyTokenResponse } from "@/types/user";
import axios, { configureAuth } from "@/lib/axios";
import { isForbiddenError } from "@/lib/apiError";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Laravel giriş jetonunu 1 gün geçerli üretir (createToken(..., now()->addDays())).
// Yanıtta bitiş zamanı dönmediği için süre, giriş anından tahmin edilir.
export const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export const LIVE_OPERATE_PERMISSION = "cuttings.live-operate";

/**
 * Laravel'in döndürdüğü izin listesinden canlı kesim erişimini çıkarır.
 * Alan yoksa (eski Laravel) null = bilinmiyor döner; o durumda uçların 403'üne güvenilir.
 */
export function liveAccessFromPermissions(permissions: unknown): boolean | null {
  if (!Array.isArray(permissions)) {
    return null;
  }
  return permissions.includes(LIVE_OPERATE_PERMISSION);
}

type UserStore = {
  userToken: string | null;
  user: User | null;
  loginAt: number | null;
  /**
   * cuttings.live-operate izni: null = henüz bilinmiyor, true = var, false = yok (403).
   * Rol adına bakılmaz; izni hangi rol taşırsa taşısın erişir.
   */
  canLiveOperate: boolean | null;
  setUserToken: (token: string) => void;
  setTokenClear: () => void;
  setUser: (user: User) => void;
  setCanLiveOperate: (value: boolean | null) => void;
  clear: () => void;
  fetchVerifyToken: (token: string | null) => Promise<void>;
  fetchLiveAccess: () => Promise<void>;
  logout: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userToken: null,
      user: null,
      loginAt: null,
      canLiveOperate: null,
      setUserToken: (token: string) =>
        set({ userToken: token, loginAt: Date.now(), canLiveOperate: null }),
      setTokenClear: () =>
        set({ userToken: null, loginAt: null, canLiveOperate: null }),
      setUser: (user: User) => set({ user }),
      setCanLiveOperate: (value: boolean | null) =>
        set({ canLiveOperate: value }),
      clear: () =>
        set({ userToken: null, user: null, loginAt: null, canLiveOperate: null }),
      fetchVerifyToken: async (token: string | null) => {
        if (!token) {
          return;
        }

        const body = (await axios.get("/api/auth/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })) as unknown as VerifyTokenResponse;

        // Yeni Laravel: data.user (id, name, role, permissions) döner → yetkiyi oradan al.
        const verifiedUser = body?.data?.user;
        const access = liveAccessFromPermissions(verifiedUser?.permissions);
        if (verifiedUser && access !== null) {
          set({
            // Laravel yanıtı esas alınır; rolsüz kullanıcıda role null gelir.
            user: {
              id: verifiedUser.id ?? get().user?.id ?? "",
              name: verifiedUser.name ?? get().user?.name ?? "",
              role: verifiedUser.role ?? "",
              permissions: verifiedUser.permissions,
            },
            canLiveOperate: access,
          });
          return;
        }

        // Eski Laravel: izin bilgisi yok → korumalı ucun 403'üne güven.
        await get().fetchLiveAccess();
      },
      /*
       * Yedek yol: Laravel izin listesi döndürmüyorsa (eski sürüm) korumalı liste ucunu
       * limit=1 ile bir kez yoklarız: 200 → var, 403 → yok.
       * 401 global yakalayıcıda girişe yönlendirir; ağ/500 hatasında önceki değer korunur.
       */
      fetchLiveAccess: async () => {
        if (!get().userToken) {
          set({ canLiveOperate: null });
          return;
        }

        try {
          await axios.get("/api/cuts/lists", { params: { limit: 1 } });
          set({ canLiveOperate: true });
        } catch (error) {
          if (isForbiddenError(error)) {
            set({ canLiveOperate: false });
          }
        }
      },
      logout: () => {
        set({ userToken: null, user: null, loginAt: null, canLiveOperate: null });
      },
    }),
    {
      name: "user-session",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

let redirectingToLogin = false;

configureAuth({
  getToken: () => useUserStore.getState().userToken,
  onUnauthorized: () => {
    // Jeton yoksa (misafir) yönlendirilecek bir oturum da yoktur.
    if (redirectingToLogin || !useUserStore.getState().userToken) {
      return;
    }
    redirectingToLogin = true;
    useUserStore.getState().clear();
    window.location.assign("/auth/login?reason=expired");
  },
});

export default useUserStore;
