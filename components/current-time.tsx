"use client"
import React, { useState, useEffect } from 'react';

const CurrentTime = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Update time immediately
    setTime(new Date().toLocaleTimeString('tr-TR'));
    
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('tr-TR'));
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm px-4 py-2 border border-gray-200">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 text-green-600" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span id="current-date-time" className="font-mono text-lg font-semibold text-gray-800">
        {time}
      </span>
    </div>
  );
};

export default CurrentTime;
