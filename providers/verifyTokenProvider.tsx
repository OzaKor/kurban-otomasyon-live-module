"use client";
import React, { useEffect } from "react";
import useUserStore from "@/store/useUserStore";

interface VerifyTokenProviderProps {
    children: React.ReactNode;
}
const VerifyTokenProvider = ({ children }: VerifyTokenProviderProps) => {
    const {userToken, fetchVerifyToken } = useUserStore();
    useEffect(() => {
       fetchVerifyToken(userToken);
    }, [fetchVerifyToken,userToken]);

    return <>{children}</>;
};

export default VerifyTokenProvider;