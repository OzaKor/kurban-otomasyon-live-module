import React from "react";
import Logo from "@/components/layout/logo";
import CurrentTime from "@/components/current-time";
interface HeaderProps {
  title?: string;
}
const Header = ({ title = "Kesim listesi" }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between flex-col sm:flex-row gap-2 px-6 py-3 text-green-900 bg-white border-b border-green-800 shadow-md">
      {/* Logo ve sol kısım */}
      <Logo />

      {/* Orta kısım - Başlık */}
      <div className="text-xl sm:text-3xl font-bold px-2.5">{title}</div>

      {/* Sağ kısım - Saat */}
      <CurrentTime />
    </header>
  );
};

export default Header;
