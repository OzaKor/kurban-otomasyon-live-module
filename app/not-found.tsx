'use client';
import React from 'react';
import {useRouter} from "next/navigation";

function NotFound() {
    const router = useRouter()
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md text-center">
                <div className="mb-8">
                    <div className="relative inline-block">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-24 h-24 text-gray-200"
                            fill="currentColor"
                        >
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold text-[#148939]">!</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-2 text-gray-800">
                    Sayfa Bulunamadı
                </h1>
                <p className="text-lg mb-8 text-gray-600">
                    Aradığınız sayfa mevcut değil.
                </p>

                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-3 bg-[#148939] text-white rounded-lg shadow-md
          hover:bg-[#0f6b2a] hover:shadow-lg hover:translate-y-[-2px]
          active:translate-y-[0px] active:shadow-md
          focus:ring-4 focus:ring-[#148939] focus:ring-opacity-30
          transform transition-all duration-200 ease-in-out
          inline-flex items-center
          hover:cursor-pointer"
                >
                    <svg className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:translate-x-[-2px]"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    <span
                        className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">
                        Ana Sayfaya Dön
          </span>
                </button>
            </div>
            {/*<div className="mt-10 w-full max-w-3xl">*/}
            {/*    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">*/}
            {/*        <div className="px-4 py-2 bg-gray-900 text-gray-200 text-sm font-mono">*/}
            {/*            Hata Detayları*/}
            {/*        </div>*/}
            {/*        <pre className="p-4 overflow-x-auto text-gray-300 text-sm">*/}
            {/*                <code>404</code>*/}
            {/*            </pre>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </main>
    );
}

export default NotFound;