"use client";
import React, { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        await fetchVerifyToken(userToken);
      } catch (error) {
        console.log("Token verification error: ", error);
        if (error instanceof Error) {
          if (axios.isAxiosError(error)) {
            console.log(
              "error.response?.data.message: ",
              error.response?.data.message
            );
          }
          setTokenClear();
          router.push("/auth/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [fetchVerifyToken, userToken, router]);

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
