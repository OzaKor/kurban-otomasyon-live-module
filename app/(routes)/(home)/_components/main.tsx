"use client";
import React from "react";
import useUserStore from "@/store/useUserStore";
import Manager from "@/app/(routes)/(home)/_components/manager";
import Guest from "@/app/(routes)/(home)/_components/guest";
const Main = () => {
    const {user}=useUserStore();
    
    return (
        <>
        {user && user.role === "super_admin" && (
            <Manager />
        )} 
        {user && user.role === "customer" && (
            <Guest />
        )} 
        {!user && (
            <Guest />
        )}           
        </>
    );
};

export default Main;
