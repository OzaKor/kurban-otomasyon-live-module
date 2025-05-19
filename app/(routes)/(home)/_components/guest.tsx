"use client";
import React from "react";
import { useUserStore } from "@/store/userStore";

const Guest = () => {
    const {user}=useUserStore();
    console.log(user);
    return (
        <>
        Ziyaretçi alanı      
        </>
    );
};

export default Guest;
