"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoginSchema from "@/app/auth/schema/loginSchema";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import showToast from "@/lib/showToast";
import { LoginResponse } from "@/types/user";
import { extractApiErrorMessage } from "@/lib/apiError";
import logger from "@/lib/logger";

interface defaultValuesInterface {
  email: string;
  password: string;
}

/*
{
    "process": false,
    "message": "Giriş işlemi başarısız",
    "data": null
}

 */

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const useUser = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const defaultValues: defaultValuesInterface = {
    email: "",
    password: "",
  };

  if (process.env.NODE_ENV === "development") {
    defaultValues.email = process.env.NEXT_PUBLIC_DEFAULT_EMAIL ?? "";
    defaultValues.password = process.env.NEXT_PUBLIC_DEFAULT_PASSWORD ?? "";
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>): Promise<void> {
    try {
      setIsLoading(true);
      const response = (await axios.post(
        "/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )) as unknown as LoginResponse;

      if (!response || typeof response !== "object") {
        showToast(
          "login-error",
          "Geçersiz sunucu yanıtı",
          "error",
          undefined,
          undefined,
          "top-right",
        );
        return;
      }

      if (!response.data) {
        showToast(
          "login-error",
          response.message || "Giriş bilgileri alınamadı",
          "error",
          undefined,
          undefined,
          "top-right",
        );
        return;
      }

      const data = response.data;

      /*
      {
  "token": "60|hwXa25Xaqg8tPFEFKBK6oblvdfJLnsIiEouTBIstbfa5411b",
  "user": {
    "id": "eyJpdiI6ImJRanV0a2xUTjlqR2xkUnhrYlRxeFE9PSIsInZhbHVlIjoiNS9WVDB0TFhDd09TM1RRQ0pjSXJ1Zz09IiwibWFjIjoiYzUxNmNmNWQwMGZjZTJhOTcyMzQ4YTI5MTc0MTU2MDJiODI2MGU1OGUzYjY5MDMxYzNjNTdjM2Q0MTI1MTQ1ZCIsInRhZyI6IiJ9",
    "name": "super_admin",
    "role": "super_admin"
  }
}
       */

      if (!data.token || !data.user) {
        showToast(
          "login-error",
          response.message || "Giriş bilgileri eksik",
          "error",
          undefined,
          undefined,
          "top-right",
        );
        return;
      }

      const tokenParts = data.token.split("|");
      const token = tokenParts.length > 1 ? tokenParts[1] : data.token;
      useUser.setUserToken(token);
      useUser.setUser({
        id: data.user.id || "",
        name: data.user.name || "",
        role: data.user.role || "",
      });

      showToast(
        "login-success",
        "Giriş Yapıldı",
        "success",
        undefined,
        undefined,
        "top-right",
        () => {
          router.push("/");
        },
      );
    } catch (error: unknown) {
      logger("Login error:", error);
      const errorMessage = extractApiErrorMessage(
        error,
        "Giriş Yapılırken Bir Hata Oluştu",
      );
      showToast(
        "login-error",
        errorMessage,
        "error",
        undefined,
        undefined,
        "top-right",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta Adresi</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="ornek@email.com"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer scale-95 hover:scale-105 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
