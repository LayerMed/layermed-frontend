import axios, { type InternalAxiosRequestConfig } from 'axios';

export interface ApiAuthHandlers {
  getAccessToken: () => string | null;
  refreshAccessToken: () => Promise<string | null>;
  onAuthFailure: () => void;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let authHandlers: ApiAuthHandlers | null = null;
let refreshPromise: Promise<string | null> | null = null;
const authPaths = ['/users/login', '/users/register', '/users/refresh', '/users/logout'];

function isAuthRequest(url?: string): boolean {
  return authPaths.some((path) => url === path || url?.startsWith(`${path}?`));
}

// Register from the browser auth layer. Never keep per-user auth state in SSR modules.
export function configureApiAuth(handlers: ApiAuthHandlers | null): void {
  if (typeof window !== 'undefined') {
    authHandlers = handlers;
  }
}

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  if (
    typeof window !== 'undefined' &&
    !(config as RetryableRequestConfig)._retry &&
    !isAuthRequest(config.url)
  ) {
    const accessToken = authHandlers?.getAccessToken();
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const request = error.config as RetryableRequestConfig | undefined;
    const handlers = authHandlers;
    if (request?._retry && error.response?.status === 401) {
      handlers?.onAuthFailure();
    }
    if (
      typeof window === 'undefined' ||
      error.response?.status !== 401 ||
      !request ||
      request._retry ||
      !handlers ||
      isAuthRequest(request.url)
    ) {
      return Promise.reject(error);
    }

    request._retry = true;
    // A previous request may already have refreshed the token while this 401 was in flight.
    const latestToken = handlers.getAccessToken();
    if (latestToken && request.headers.get('Authorization') !== `Bearer ${latestToken}`) {
      request.headers.set('Authorization', `Bearer ${latestToken}`);
      return apiClient(request);
    }

    if (!refreshPromise) {
      refreshPromise = Promise.resolve()
        .then(() => handlers.refreshAccessToken())
        .catch(() => null)
        .then((token) => {
          if (!token) handlers.onAuthFailure();
          return token;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    const token = await refreshPromise;
    if (!token) return Promise.reject(error);

    request.headers.set('Authorization', `Bearer ${token}`);
    return apiClient(request);
  }
);
