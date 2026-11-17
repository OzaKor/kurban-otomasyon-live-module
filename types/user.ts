export interface User {
  id: number | string;
  name: string;
  role: string;
  /**
   * Canlı ekranla ilgili izinler (ör. "cuttings.live-operate").
   * Eski Laravel bu alanı döndürmez → undefined = bilinmiyor. Yalnız arayüz içindir;
   * asıl yetki kontrolü Laravel'de.
   */
  permissions?: string[];
}

// Laravel'in döndürdüğü kullanıcı bloğu: rolü olmayan kullanıcıda role null gelir.
export interface ApiUser extends Omit<User, "role"> {
  role: string | null;
}

export interface VerifyTokenResponse {
  process: boolean;
  message: string;
  data?: { user?: ApiUser } | null;
}

export interface LoginResponseData {
  token: string;
  user: User;
}

export interface LoginResponse {
  process: boolean;
  message: string;
  data: LoginResponseData;
}
