import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
interface RoutesLayoutProps {
    children: React.ReactNode
}
const RoutesLayout = ({children}:RoutesLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow container mx-auto py-6">
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default RoutesLayout;