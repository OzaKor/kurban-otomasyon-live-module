"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/components/layout/logo";

const Counter = () => {
  const [counter, setCounter] = useState(40);
  const [cutDate, setCutDate] = useState("26.05.2025");
  const [cutTime, setCutTime] = useState("12:03:00");
  const [isLoading, setIsLoading] = useState(false);

  // Refresh counter every 10 seconds
  useEffect(() => {
    const refreshCounter = async () => {
      setIsLoading(true);
      try {
        // API call to get counter data
        // const response = await fetch('/api/counter');
        // const data = await response.json();
        // setCounter(data.counter);
        // setCutDate(data.cutDate);
        // setCutTime(data.cutTime);

        // Simulated data update for demonstration
        // Remove this when connecting to real API
        setCounter((prev) => prev);
        const now = new Date();
        setCutDate(now.toLocaleDateString("tr-TR"));
        setCutTime(now.toLocaleTimeString("tr-TR"));
      } catch (error) {
        console.error("Error fetching counter:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial load
    refreshCounter();

    // Set up polling every 10 seconds
    const interval = setInterval(refreshCounter, 10000);

    return () => clearInterval(interval);
  }, []);

  const isNumeric = !isNaN(counter) && isFinite(counter);

  return (
    <div className="relative flex items-center justify-center min-h-[50vh] p-4">
      <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl overflow-hidden w-72 sm:w-96 mx-auto border border-green-100 transform transition-all duration-500 hover:shadow-green-200">
        {/* Header Section */}
        <div className="w-full bg-gradient-to-r from-green-600 to-green-500 p-5 text-center">
          {/* Top Logo */}
          <Logo className="h-20 w-96 mx-auto mb-2 relative" />
          <h2 className="text-white text-3xl font-extrabold tracking-wider">
            KESİM SIRASI
          </h2>
        </div>

        {/* Content Section */}
        <div className="w-full bg-green-50">
          <div className="flex flex-col items-center justify-center py-10 px-6 w-full">
            {/* Counter Value */}
            <div
              className={`text-center ${
                isNumeric ? "text-9xl" : "text-6xl"
              } font-black text-green-700 tracking-tighter my-6 transition-all duration-300`}
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
            <Logo src="/images/ozkr-logo.png" className="opacity-80 h-24 w-72" width={600} height={600} />
          </div>
        </div>
      </div>

      {/* Animation Effects */}
      <div className="absolute -top-5 -right-5 w-16 h-16 bg-green-500 rounded-full opacity-20 animate-ping"></div>
      <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-ping [animation-delay:700ms]"></div>
    </div>
  );
};

export default Counter;
