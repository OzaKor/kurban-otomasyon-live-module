"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "@/lib/axios";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [cutDate, setCutDate] = useState("");
  const [cutTime, setCutTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const refreshCounter = async () => {
    setIsLoading(true);
    try {
      const url = `api/cuts/counter`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setCounter(response.data.counter ?? 0);
      const now = new Date();
      setCutDate(now.toLocaleDateString("tr-TR"));
      setCutTime(now.toLocaleTimeString("tr-TR"));
      if (isError) {
        setIsError(false);
      }
    } catch (error) {
      console.error("Error fetching counter:", error);
      setCounter(0);
      setCutDate("");
      setCutTime("");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  // Refresh counter every 10 seconds
  useEffect(() => {
    // Initial load
    refreshCounter();

    // Set up polling every 10 seconds
    const interval = setInterval(refreshCounter, 10000);

    return () => clearInterval(interval);
  }, []);

  const isNumeric =
    Number(counter) && !isNaN(Number(counter)) && isFinite(Number(counter));

  return (
    <>
      {isError && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mb-4"></div>
            <p className="text-lg font-medium text-gray-800">Sunucu Hatası</p>
          </div>
        </div>
      )}
      {!isError && isLoading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mb-4"></div>
            <p className="text-lg font-medium text-gray-800">Yükleniyor...</p>
          </div>
        </div>
      )}

      {!isError && (
        <div className="relative">
          <Card className="w-72 sm:w-96 mx-auto bg-green-50 border-green-100 shadow-2xl hover:shadow-green-200 transition-all duration-500 overflow-hidden">
            <CardHeader className="p-0 -mt-6">
              <div className="w-full bg-gradient-to-r from-green-600 to-green-500 p-5 text-center">
                {/* Top Logo */}
                <div className="h-24 w-64 lg:w-90 mx-auto mb-2 relative">
                  <Image
                    src="/images/white-logo.png"
                    alt="Logo"
                    width={1757}
                    height={501}
                    className="object-contain drop-shadow-md h-20 w-64 lg:w-90 mx-auto mb-2"
                    priority
                  />
                </div>
                <h2 className="text-white text-3xl font-extrabold tracking-wider">
                  KESİM SIRASI
                </h2>
              </div>
            </CardHeader>

            <CardContent className="p-0 bg-green-50">
              <div className="flex flex-col items-center justify-center py-4 px-6 w-full">
                {/* Counter Value */}
                <div
                  className={`text-center ${
                    isNumeric ? "text-9xl" : "text-6xl"
                  } font-black text-green-700 tracking-tighter my-4 transition-all duration-300`}
                >
                  {counter}
                </div>

                {/* Date and Time Info */}
                <div className="flex items-center justify-center mb-5 bg-white/50 py-2 px-4 rounded-full shadow-inner">
                  <div className="text-green-800 text-xl font-medium flex items-center">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <span>{cutDate}</span>
                    <span className="font-bold ml-2 text-xl">{cutTime}</span>
                  </div>
                </div>

                {/* Bottom Logo */}
                <div className="h-20 w-60 lg:w-80 relative opacity-80">
                  <Image
                    src="/images/ozkr-logo.png"
                    alt="Logo"
                    width={1600}
                    height={400}
                    className="object-contain h-20 w-60 lg:w-80 mx-auto"
                    priority
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Animation Effects */}
          <div className="absolute -top-5 left-10 md:left-40 w-16 h-16 bg-green-500 rounded-full opacity-20 animate-ping [animation-duration:2400ms]"></div>
          <div className="absolute -top-5 right-10 md:right-40 w-16 h-16 bg-green-500 rounded-full opacity-20 animate-ping [animation-delay:2800ms]"></div>
          <div className="absolute -bottom-5 left-10 md:left-40 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-ping [animation-delay:3200ms]"></div>
          <div className="absolute -bottom-5 right-10 md:right-40 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-ping [animation-delay:3600ms]"></div>
        </div>
      )}
    </>
  );
};

export default Counter;
