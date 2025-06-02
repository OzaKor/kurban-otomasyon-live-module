"use client";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import VerifyTokenProvider from "@/providers/verifyTokenProvider";
import Offline from "@/components/offline";

const OfflineProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // İlk yüklemede mevcut durumu ayarla
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {isOnline ? (
        <>
          <VerifyTokenProvider>{children}</VerifyTokenProvider>
          <Toaster richColors />
        </>
      ) : (
        <Offline />
      )}
    </>
  );
};

export default OfflineProvider;
