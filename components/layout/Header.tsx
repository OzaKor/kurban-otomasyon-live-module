"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from "@/components/layout/logo";

interface HeaderProps {
    title?: string

}
const Header = ({ title = "Kesim listesi" }: HeaderProps) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        };

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="flex items-center justify-between flex-col sm:flex-row gap-2 px-6 py-3 text-green-900 bg-white border-b border-green-800 shadow-md">
            {/* Logo ve sol kısım */}
<Logo/>

            {/* Orta kısım - Başlık */}
            <div className="text-xl sm:text-3xl font-bold px-2.5">
                {title}
            </div>

            {/* Sağ kısım - Saat */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <div className="text-xl font-bold">
                    {currentTime}
                </div>
            </div>
        </header>
    );
};

export default Header;