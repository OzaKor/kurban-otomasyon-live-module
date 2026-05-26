declare namespace NodeJS {
  interface ProcessEnv {
    // Özel ortam değişkenlerinizi buraya ekleyin
    NODE_ENV: "development" | "production" | "test";

    // Giriş bilgileri için varsayılan değerler (geliştirme ortamında)
    NEXT_PUBLIC_DEFAULT_EMAIL?: string;
    NEXT_PUBLIC_DEFAULT_PASSWORD?: string;

    // API URL'si
    BACKEND_URL: string;
  }
}
