export interface User {
  id: string;
  name: string;
  role: string;
  username: string;
  phone: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  results: {
    accessToken: string;
    user: User;
  };
}