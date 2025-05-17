import React from "react";
import Link from "next/link";
import Logo from "@/components/layout/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/app/auth/login/_components/login-form";

const Login = () => {
  return (
    <div className="flex items-center justify-center p-4 2xl:mt-40 mt-0">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/">
              <div className="flex items-center">
                <Logo />
              </div>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Hoş Geldiniz
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Lütfen hesabınıza giriş yapın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
