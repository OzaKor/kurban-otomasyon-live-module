"use client";
import React, { useEffect } from "react";
import useUserStore from "@/store/useUserStore";

interface VerifyTokenProviderProps {
    children: React.ReactNode;
}
const VerifyTokenProvider = ({ children }: VerifyTokenProviderProps) => {
    const { fetchVerifyToken } = useUserStore();

    useEffect(() => {
       fetchVerifyToken();
    }, [fetchVerifyToken]);

    return <>{children}</>;
};

export default VerifyTokenProvider;