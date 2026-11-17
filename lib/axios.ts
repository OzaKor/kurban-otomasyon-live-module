import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import logger from "@/lib/logger";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  token?: string;
}

export const apiUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:8000/api/v1";

/*
 * Tarayıcı tarafı oturum bağlantısı (tespit J).
 * useUserStore modülü yüklenince configureAuth() ile jeton okuyucuyu ve
 * 401 işleyicisini kaydeder. Böylece bu dosya store'u import etmez (döngüsel bağımlılık yok)
 * ve sunucu tarafında (route handler'lar) hiçbir etkisi olmaz.
 */
type AuthConfig = {
  getToken: () => string | null;
  onUnauthorized: () => void;
};

let authConfig: AuthConfig | null = null;

export function configureAuth(config: AuthConfig) {
  authConfig = config;
}

const isBrowser = () => typeof window !== "undefined";

const isInternalApi = (url?: string) => !!url && url.startsWith("/api/");

// Giriş isteğinin 401'i "yanlış şifre" demektir; oturum düşmesi sayılmaz.
const isLoginRequest = (url?: string) => !!url && url.startsWith("/api/auth/login");

const axiosInstance: AxiosInstance = axios.create({
  timeout: 25000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (isBrowser() && authConfig && isInternalApi(config.url)) {
      const token = authConfig.getToken();
      if (token && !config.headers.has("Authorization")) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // Jeton/başlık/gövde loglanmaz: yalnız durum ve adres.
    logger("API hatası:", error.response?.status ?? error.code, error.config?.url);

    if (
      isBrowser() &&
      authConfig &&
      error.response?.status === 401 &&
      isInternalApi(error.config?.url) &&
      !isLoginRequest(error.config?.url)
    ) {
      authConfig.onUnauthorized();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
