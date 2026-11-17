"use client";
import React, { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import logger from "@/lib/logger";
import { getErrorStatus, isUnauthorizedError } from "@/lib/apiError";
import showToast from "@/lib/showToast";

interface VerifyTokenProviderProps {
  children: React.ReactNode;
}

const VerifyTokenProvider = ({ children }: VerifyTokenProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userToken, setTokenClear, fetchVerifyToken } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!userToken) {
          return;
        }
        // Doğrular ve canlı kesim yetkisini belirler (permissions alanı ya da 403 yoklaması).
        await fetchVerifyToken(userToken);
      } catch (error) {
        logger("Token doğrulama hatası:", getErrorStatus(error));
        if (isUnauthorizedError(error)) {
          // Oturum gerçekten düşmüş: jetonu sil, girişe gönder.
          setTokenClear();
          router.push("/auth/login?reason=expired");
        } else {
          // Ağ kesintisi / sunucu hatası: oturumu düşürme, görevliyi uyar.
          showToast(
            "verify-token-error",
            "Sunucuya ulaşılamadı, oturum doğrulanamadı. Bağlantıyı kontrol edin.",
            "warning",
            undefined,
            undefined,
            "top-center",
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [fetchVerifyToken, userToken, router, setTokenClear]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Doğrulanıyor...</p>
          <p className="text-sm text-gray-500 mt-2">Lütfen bekleyiniz</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default VerifyTokenProvider;
