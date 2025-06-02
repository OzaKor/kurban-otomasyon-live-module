"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
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


interface  defaultValuesInterface {
  email: string;
  password: string;
}
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
    defaultValues.email = "super_admin@admin.com";
    defaultValues.password = "ozkr#.Gs#";
  }


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token =  response.data.token.split("|")[1];
      useUser.setUserToken(`${token}`);
      useUser.setUser({
        id: response.data.user.id || "",
        name: response.data.user.name || "",
        role: response.data.user.role || "",
      });

      showToast("login-success","Giriş Yapıldı","success",undefined,undefined,"top-right",()=>{
        router.push("/");
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const axiosError = error as AxiosError;
        console.error("Login error:", error);

        if (axiosError.response) {
          console.error("Error data:", axiosError.response.data);
          console.error("Error status:", axiosError.response.status);
          console.error("Error headers:", axiosError.response.headers);
        } else if (axiosError.request) {
          console.error("No response received:", axiosError.request);
        } else {
          console.error("Error message:", error.message);
        }
      } else {
        console.error("An unknown error occurred");
      }

      showToast("login-error","Giriş Yapılırken Bir Hata Oluştu","error",undefined,undefined,"top-right",()=>{
        console.log("Giriş Yapılırken Bir Hata Oluştu");
      });
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
