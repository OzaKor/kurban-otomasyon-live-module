import React from 'react';
import Header from "@/components/layout/Header";

interface RoutesLayoutProps {
    children: React.ReactNode
}
const RoutesLayout = ({children}:RoutesLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header title={"Kurban Otomasyon"}/>
            <main className="flex-grow container mx-auto py-6">
                {children}
            </main>
        </div>
    );
};

export default RoutesLayout;