"use client";
import React, { useEffect } from "react";
import useUserStore from "@/store/useUserStore";

interface VerifyTokenProviderProps {
    children: React.ReactNode;
}
const VerifyTokenProvider = ({ children }: VerifyTokenProviderProps) => {
    const {userToken, fetchVerifyToken } = useUserStore();
console.log("VerifyTokenProvider userToken: ", userToken);
    useEffect(() => {
       fetchVerifyToken(userToken);
    }, [fetchVerifyToken]);

    return <>{children}</>;
};

export default VerifyTokenProvider;