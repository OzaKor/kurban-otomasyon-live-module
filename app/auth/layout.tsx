"use client";
import React, { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { userToken } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (userToken) {
      router.push("/");
    }
  }, [userToken, router]);

  if (userToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
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
