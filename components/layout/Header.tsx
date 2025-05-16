"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
        <header className="flex items-center justify-between px-6 py-3 text-green-900 bg-white border-b border-green-800 shadow-md">
            {/* Logo ve sol kısım */}
            <div className="flex items-center space-x-3">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    sizes="(max-width: 48px)"
                    className="rounded-full object-contain w-full h-12"
                    priority
                    width={1600}
                    height={455}
                />
            </div>

            {/* Orta kısım - Başlık */}
            <div className="text-2xl font-bold">
                {title}
            </div>

            {/* Sağ kısım - Saat */}
            <div className="text-xl font-bold">
                {currentTime}
            </div>
        </header>
    );
};

export default Header;