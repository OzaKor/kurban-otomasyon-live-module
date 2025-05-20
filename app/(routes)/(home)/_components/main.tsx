"use client";
import React from "react";
import { useUserStore } from "@/store/userStore";
import Manager from "@/app/(routes)/(home)/_components/manager";
import Guest from "@/app/(routes)/(home)/_components/guest";
const Main = () => {
    const {user}=useUserStore();
    console.log(user);
    return (
        <>
        {user && (
            <Manager />
        )} 
        {!user && (
            <Guest />
        )}           
        </>
    );
};

export default Main;
