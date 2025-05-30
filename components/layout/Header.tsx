"use client";
import React, { useState } from "react";
import Logo from "@/components/layout/logo";
import CurrentTime from "@/components/current-time";
import Link from "next/link";
import { LogIn, Tv } from "lucide-react";
import useUserStore from "@/store/useUserStore";
interface HeaderProps {
  title?: string;
}
const Header = ({ title = "Kesim listesi" }: HeaderProps) => {
  const { userToken } = useUserStore();
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const handleDoubleClick = () => {
    setIsDoubleClicked(true);
    setTimeout(() => {
      setIsDoubleClicked(false);
    }, 5000);
  };
  return (
    <header className="flex items-center justify-between flex-col sm:flex-row gap-2 px-6 py-1 text-green-900 bg-white border-b border-green-800 shadow-md">
      {/* Logo ve sol kısım */}
      <Link href="/">
        <Logo />
      </Link>
      {/* Orta kısım - Başlık */}
      <div
        className="text-xl sm:text-3xl font-bold px-2.5"
        onDoubleClick={handleDoubleClick}
      >
        {isDoubleClicked ? (
          <nav className="flex gap-2 items-center">
            {!userToken && (
              <Link
                href="/auth/login"
                className="hover:bg-green-100 size-12 p-2 rounded-full flex items-center justify-center"
              >
                <LogIn size={24} color="green" />
              </Link>
            )}
            <Link
              href="/counter"
              className="hover:bg-green-100 size-12 p-2 rounded-full flex items-center justify-center"
            >
              <Tv size={24} color="green" />
            </Link>
          </nav>
        ) : (
          title
        )}
      </div>

      {/* Sağ kısım - Saat */}
      <CurrentTime />
    </header>
  );
};

export default Header;
