"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import useUserStore, { TOKEN_TTL_MS } from "@/store/useUserStore";
import { FORBIDDEN_LIVE_MESSAGE } from "@/lib/apiError";
import { resetLiveStores } from "@/store/cuts/resetLiveStores";

const WARN_BEFORE_MS = 60 * 60 * 1000;

const useRelogin = () => {
  const { logout } = useUserStore();
  const router = useRouter();
  return () => {
    // Görevlinin listesi bellekteyken çıkılabilir: kesim verisini de sil.
    resetLiveStores();
    logout();
    router.push("/auth/login");
  };
};

/** Giriş yapılmış ama hesapta cuttings.live-operate izni yok (Laravel 403). */
export const NoLiveAccessNotice = () => {
  const relogin = useRelogin();

  return (
    <div
      role="alert"
      className="m-2 flex flex-col gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 size-6 shrink-0" />
        <div>
          <p className="text-lg font-bold">{FORBIDDEN_LIVE_MESSAGE}</p>
          <p className="text-sm">
            Bu hesap kesim listesini görüntüleyemez ve kesim işlemi yapamaz.
            Yetkili bir hesapla giriş yapın veya yöneticinizden canlı kesim
            iznini isteyin.
          </p>
        </div>
      </div>
      <Button variant="destructive" onClick={relogin} className="shrink-0">
        Farklı hesapla giriş yap
      </Button>
    </div>
  );
};

/**
 * Jeton 1 gün geçerli; bitiş zamanı Laravel yanıtında dönmediği için giriş anından
 * tahmin edilir. Son 1 saatte görevliyi uyarır.
 */
export const SessionExpiryNotice = () => {
  const { loginAt } = useUserStore();
  const relogin = useRelogin();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (!loginAt || now === null) {
    return null;
  }

  const remainingMs = loginAt + TOKEN_TTL_MS - now;
  if (remainingMs > WARN_BEFORE_MS) {
    return null;
  }

  const minutes = Math.max(0, Math.ceil(remainingMs / 60000));

  return (
    <div
      role="status"
      className="m-2 flex flex-col gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-yellow-900 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <Clock className="size-5 shrink-0" />
        <p className="text-sm font-medium">
          Oturumunuz yaklaşık {minutes} dakika içinde sona erecek. Kesime ara
          verdiğiniz bir anda yeniden giriş yapın.
        </p>
      </div>
      <Button variant="outline" onClick={relogin} className="shrink-0">
        Yeniden giriş yap
      </Button>
    </div>
  );
};
