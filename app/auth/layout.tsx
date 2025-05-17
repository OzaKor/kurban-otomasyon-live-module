"use client"
import React from 'react';
import Footer from "@/components/layout/Footer";
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({children}: AuthLayoutProps) => {
    const {userToken}=useUserStore();
    
    const router = useRouter();
    if(userToken){
        router.push("/");
    }
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto py-6">
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default AuthLayout;