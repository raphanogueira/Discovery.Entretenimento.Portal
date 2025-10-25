import axios, { type InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from '../types/ApiResponse';

interface FailedQueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for sending cookies (refreshToken)
});

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    } else {
      prom.reject(new Error('Token refresh failed'));
    }
  });

  failedQueue = [];
};

// Request interceptor to add access token to requests
api.interceptors.request.use(
  (config) => {
    const token = (window as Window & { __accessToken__?: string }).__accessToken__;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Avoid refreshing for login, refresh, and logout endpoints
      if (
        originalRequest.url?.includes('/api/auth/login') ||
        originalRequest.url?.includes('/api/auth/refresh') ||
        originalRequest.url?.includes('/api/auth/logout')
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api.request(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        const response = await api.post<ApiResponse<{ accessToken: string }>>('/api/auth/refresh');
        
        if (response.data?.content?.accessToken) {
          const newToken = response.data.content.accessToken;
          
          // Update the global token
          (window as Window & { __accessToken__?: string }).__accessToken__ = newToken;
          
          // Trigger event to update context
          window.dispatchEvent(new CustomEvent('accessTokenRefreshed', { detail: { token: newToken } }));
          
          // Process queued requests with new token
          processQueue(null, newToken);
          
          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return api.request(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear auth state
        processQueue(refreshError, null);
        (window as Window & { __accessToken__?: string }).__accessToken__ = undefined;
        window.dispatchEvent(new Event('authExpired'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
