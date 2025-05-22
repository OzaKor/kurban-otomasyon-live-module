"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import useCutSettingStore from "@/store/useCutSettingStore";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw, Pause, CheckCircle, BadgeCheck, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import axios from "axios";
import useUserStore from "@/store/useUserStore";
import useToast from "@/hooks/useToast";

const Setting = () => {
  const { userToken } = useUserStore();
  const { state, setState } = useCutSettingStore();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const setUpdate = (key: string) => {
    setState((prev) => {
      switch (key) {
        case "start":
          return {
            ...prev,
            proccessStart: false,
            proccessEnd: true,
            processContiune: false,
            processStop: true,
          };

        case "end":
          return {
            ...prev,
            proccessStart: true,
            proccessEnd: false,
            processContiune: false,
            processStop: false,
          };

        case "stop":
          return {
            ...prev,
            proccessStart: false,
            proccessEnd: true,
            processContiune: true,
            processStop: false,
          };

        case "contiune":
          return {
            ...prev,
            proccessStart: false,
            proccessEnd: true,
            processContiune: false,
            processStop: true,
          };

        default:
          return prev;
      }
    });
  };
  const handleProcessCut = (key: string) => {
    setLoading(true);

    setUpdate(key);

    const data = {
      message,
      key,
    };
    axios
      .put(`/api/cut-settings`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        useToast("success","Kesim ayarları güncellendi","success",undefined,undefined,"top-right",()=>{
          console.log("Kesim ayarları güncellendi");
        });
      })
      .catch((error) => {
        console.error("Kesim ayarları hatası: ", error);
        useToast("error", "Kesim ayarları güncellenemedi","error",undefined,undefined,"top-right",()=>{
          console.log("Kesim ayarları güncellenemedi: ",error);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col space-y-4">
        <Label htmlFor="message">Kesim Mesajı</Label>
        <Textarea
          placeholder="Kesim mesajını buraya yazabilirsiniz"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Separator />
      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {state.proccessStart && (
          <Button
            className={cn(
              "flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70 text-white font-medium text-lg px-4 py-4 rounded-lg transition-colors duration-200 shadow-md hover:scale-105 hover:cursor-pointer",
              loading && "cursor-not-allowed opacity-70"
            )}
            onClick={() => handleProcessCut("start")}
            disabled={loading}
          >
            <Play className={cn("size-5", loading && "animate-pulse")} />
            Kesime Başla
          </Button>
        )}
        {state.processContiune && (
          <Button
            className={cn(
              "flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 text-white font-medium text-lg px-4 py-4 rounded-lg transition-colors duration-200 shadow-md hover:scale-105 hover:cursor-pointer",
              loading && "cursor-not-allowed opacity-70"
            )}
            onClick={() => handleProcessCut("contiune")}
            disabled={loading}
          >
            <RefreshCw className={cn("size-5", loading && "animate-pulse")} />
            Kesime Devam Et
          </Button>
        )}
        {state.processStop && (
          <Button
            className={cn(
              "flex items-center justify-center gap-3 w-full bg-yellow-600 hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-70 text-white font-medium text-lg px-4 py-4 rounded-lg transition-colors duration-200 shadow-md hover:scale-105 hover:cursor-pointer",
              loading && "cursor-not-allowed opacity-70"
            )}
            onClick={() => handleProcessCut("stop")}
            disabled={loading}
          >
            <Pause className={cn("size-5", loading && "animate-pulse")} />
            Kesimi Durdur
          </Button>
        )}
        {state.proccessEnd && (
          <Button
            className={cn(
              "flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 text-white font-medium text-lg px-4 py-4 rounded-lg transition-colors duration-200 shadow-md hover:scale-105 hover:cursor-pointer",
              loading && "cursor-not-allowed opacity-70"
            )}
            onClick={() => handleProcessCut("end")}
            disabled={loading}
          >
            <CheckCircle className={cn("size-5", loading && "animate-pulse")} />
            Kesimi Bitir
          </Button>
        )}
      </motion.div>
      {JSON.stringify(state, null, 2)}
    </div>
  );
};

export default Setting;
