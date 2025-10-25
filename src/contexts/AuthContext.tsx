/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User } from '../types/Auth';
import api from '../services/api';
import type { ApiResponse } from '../types/ApiResponse';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    (window as Window & { __accessToken__?: string }).__accessToken__ = token ?? undefined;
  };

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // This endpoint should return the user data if the session is valid
        const response = await api.get<ApiResponse<User>>('/api/auth/me');
        if (response.data?.content) {
          setUser(response.data.content);
        }
      } catch (error) {
        // It's okay if this fails, it just means the user is not logged in
        console.log('Not authenticated');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // Listen for token refresh events from the interceptor
  useEffect(() => {
    const handleTokenRefresh = (event: Event) => {
      const customEvent = event as CustomEvent<{ token: string }>;
      setAccessTokenState(customEvent.detail.token);
    };

    const handleAuthExpired = () => {
      setAccessTokenState(null);
      setUser(null);
      toast.error('Sua sessão expirou. Por favor, faça login novamente.');
      navigate('/login');
    };

    window.addEventListener('accessTokenRefreshed', handleTokenRefresh as EventListener);
    window.addEventListener('authExpired', handleAuthExpired);

    return () => {
      window.removeEventListener('accessTokenRefreshed', handleTokenRefresh as EventListener);
      window.removeEventListener('authExpired', handleAuthExpired);
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<ApiResponse<{ accessToken: string; user: User }>>('/api/auth/login', {
        email,
        password,
      });

      if (response.data?.content) {
        const { accessToken: token, user: userData } = response.data.content;
        setAccessToken(token);
        setUser(userData);
        toast.success('Login bem-sucedido!');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken(null);
      setUser(null);
      toast.info('Você foi desconectado.');
      navigate('/');
    }
  };

  const value: AuthContextType = {
    isAuthenticated: !!user, // Base authentication on user presence
    accessToken,
    user,
    login,
    logout,
    setAccessToken,
    setUser,
  };

  // Render a loading state or null while checking auth
  if (isLoading) {
    return null; // Or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

