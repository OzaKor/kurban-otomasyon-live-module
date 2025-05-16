import React from 'react';
import Footer from "@/components/layout/Footer";

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({children}: AuthLayoutProps) => {
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