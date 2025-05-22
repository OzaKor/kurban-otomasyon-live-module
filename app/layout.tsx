import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import VerifyTokenProvider from "@/providers/verifyTokenProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kurban Otomasyon Live Module",
  description: "Kurban Otomasyon Live Module",
  icons: {
    icon: [
      {
        url: "/images/favicon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
  },
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${montserrat.variable} antialiased`}>
        <VerifyTokenProvider>{children}</VerifyTokenProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
