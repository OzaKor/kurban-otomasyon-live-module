import React from 'react';
import Image from "next/image";

const Logo = () => {
    return (
        <div className="flex items-center space-x-1 shrink-0">
            <Image
                src="/images/logo.png"
                alt="Logo"
                sizes="(max-width: 48px)"
                className="rounded-full object-contain w-full h-14"
                priority
                width={1600}
                height={455}
            />
        </div>
    );
};

export default Logo;