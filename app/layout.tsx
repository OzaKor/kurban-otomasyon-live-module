import type {Metadata} from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";
import React from "react";


const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kurban Otomasyon Live Module",
    description: "Kurban Otomasyon Live Module",
    icons: {
        icon: '/public/images/icon-144x144.png',
    },
    metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
        <body
            className={`${montserrat.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
