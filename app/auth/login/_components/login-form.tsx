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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

const LoginForm = () => {
  const [isLoading,setIsLoading]=useState(false);
  const {setUser,setUserToken}=useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "super_admin@admin.com",
      password: "ozkr#.Gs#",
    },
  });

  // Handle form submission
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

      console.log("Login successful:", response);
      // Handle successful login (e.g., redirect, set user state, etc.)
      toast.success("Giriş Yapıldı", {
        id: "login-success",
        duration: 1500,
        icon: "✅",
        onAutoClose(toast) {
          console.log("Toast auto closed", toast);
          setUser(response.data.user);
          setUserToken(response.data.token);
          router.push("/");
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const axiosError = error as AxiosError;
        console.error("Login error:", error);
        
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error data:', axiosError.response.data);
          console.error('Error status:', axiosError.response.status);
          console.error('Error headers:', axiosError.response.headers);
        } else if (axiosError.request) {
          // The request was made but no response was received
          console.error('No response received:', axiosError.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
      } else {
        console.error('An unknown error occurred');
      }
    
      toast.error("Giriş Yapılırken Bir Hata Oluştu", {
        id: "login-error",
        duration: 1500,
        icon: "❌",
      });
    }
    finally {
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
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2" disabled={isLoading}>
          {isLoading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
