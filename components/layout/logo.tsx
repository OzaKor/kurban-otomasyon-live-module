import React from 'react';
import Image from "next/image";
import { cn } from '@/lib/utils';

interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
}

const Logo = ({ width, height, className, alt }: LogoProps) => {
    return (
        <div className="flex items-center space-x-1 shrink-0">
            <Image
                src="/images/logo.png"
                alt={alt || "Logo"}
                sizes="(max-width: 48px)"
                className={cn("rounded-full object-contain w-full h-14", className)}
                priority
                width={width || 1600}
                height={height || 455}
            />
        </div>
    );
};

export default Logo;