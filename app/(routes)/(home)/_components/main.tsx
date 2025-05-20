"use client";
import React from "react";
import useUserStore from "@/store/useUserStore";
import Manager from "@/app/(routes)/(home)/_components/manager";
import Guest from "@/app/(routes)/(home)/_components/guest";
const Main = () => {
    const {user,userToken}=useUserStore();
    console.log("main userToken ",userToken);
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
