export interface User {
    id: number | string;
    name: string;
    role: string;
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
