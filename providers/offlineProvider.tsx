"use client";
import { useSyncExternalStore } from "react";
import { Toaster } from "@/components/ui/sonner";
import VerifyTokenProvider from "@/providers/verifyTokenProvider";
import Offline from "@/components/offline";

const subscribeToOnlineStatus = (callback: () => void) => {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
};

const getOnlineSnapshot = () => navigator.onLine;
const getOnlineServerSnapshot = () => true;

const OfflineProvider = ({ children }: { children: React.ReactNode }) => {
  const isOnline = useSyncExternalStore(
    subscribeToOnlineStatus,
    getOnlineSnapshot,
    getOnlineServerSnapshot,
  );

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
