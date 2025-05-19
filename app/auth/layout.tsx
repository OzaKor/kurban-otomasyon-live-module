"use client";
import React, { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

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
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
