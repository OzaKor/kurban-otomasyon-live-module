"use client";
import React from "react";
import { useUserStore } from "@/store/userStore";

const Manager = () => {
    const {user}=useUserStore();
    console.log(user);
    return (
        <>
        Yönetici alanı      
        </>
    );
};

export default Manager;
