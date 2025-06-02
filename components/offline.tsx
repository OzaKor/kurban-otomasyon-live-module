"use client";

import { Button } from "@/components/ui/button";
import { WifiOff, Wifi, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const CONNECTION_CHECK_DELAY = 2000; // 2 saniye bekle

type Status = 'checking' | 'online' | 'offline';

const Offline = () => {
  const [status, setStatus] = useState<Status | string>('checking');
  const [retryCount, setRetryCount] = useState(0);

  const checkConnection = async (isRetry = false) => {
    if (isRetry) {
      setStatus('checking');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Sunucuya basit bir istek atarak bağlantıyı kontrol et
    try {
      const response = await axios.head('/api/health', {
        timeout: 3000, // 3 saniye zaman aşımı
        headers: {
          'Cache-Control': 'no-store'
        }
      });
      
      if (response.status === 200) {
        setStatus('online');
        // 2 saniye bekle ve sayfayı yenile
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setStatus('offline');
      }
    } catch (error) {
      setStatus('offline');
    }
  };

  useEffect(() => {
    const checkInitialConnection = async () => {
      // İlk yüklemede biraz bekle
      await new Promise(resolve => setTimeout(resolve, CONNECTION_CHECK_DELAY));
      await checkConnection();
    };

    checkInitialConnection();

    const handleOnline = () => checkConnection();
    const handleOffline = () => setStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Yükleme durumunda
  if (status === 'checking') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="p-6 mb-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bağlantı Kontrol Ediliyor...</h1>
        <p className="text-gray-600">Lütfen bekleyiniz.</p>
      </div>
    );
  }

  // Çevrimiçi durumunda
  if (status === 'online') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="p-6 bg-green-100 rounded-full mb-4">
          <Wifi className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bağlantı Kuruldu!</h1>
        <p className="text-gray-600 mb-6">Yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  // Çevrimdışı durumunda
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="p-6 bg-red-100 rounded-full mb-4">
        <WifiOff className="w-12 h-12 text-red-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">İnternet Bağlantısı Yok</h1>
      <p className="text-gray-600 mb-6">
        Uygulamaya erişmek için internet bağlantınızın olduğundan emin olun.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => {
            setRetryCount(prev => prev + 1);
            checkConnection(true);
          }} 
          variant="outline" 
          className="gap-2"
          disabled={status === 'checking'}
        >
          {status === 'checking' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Wifi className="w-4 h-4" />
          )}
          Yeniden Dene {retryCount > 0 && `(${retryCount})`}
        </Button>
        <Button 
          onClick={() => window.location.reload()}
          disabled={status === 'checking'}
        >
          Sayfayı Yenile
        </Button>
      </div>
    </div>
  );
};

export default Offline;
