"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && userToken) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [userToken, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (userToken) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
