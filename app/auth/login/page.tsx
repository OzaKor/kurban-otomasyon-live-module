import React from 'react';
import Link from "next/link";
import Logo from "@/components/layout/logo";

const Login = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/">
                       <Logo/>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;