export interface User {
  id: string;
  nome: string;
  email: string;
  fotoPerfil?: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}
