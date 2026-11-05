'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { configureApiAuth } from '@/shared/api/axios';
import { getCurrentUser, login, logout, refresh, register } from '../api/auth';
import type { CurrentUserDto, LoginCredentials, RegisterCredentials } from './types';

const currentUserKey = ['auth', 'current-user'] as const;

interface AuthContextValue {
  user: CurrentUserDto | null;
  isRestoring: boolean;
  isUserLoading: boolean;
  isUserError: boolean;
  retryUser: () => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const tokenRef = useRef<string | null>(null);
  const refreshRef = useRef<Promise<string | null> | null>(null);
  const loggingOutRef = useRef(false);
  const generationRef = useRef(0);
  const [token, setToken] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  const setAccessToken = useCallback((value: string | null) => {
    tokenRef.current = value;
    setToken(value);
  }, []);

  const clearAuth = useCallback(() => {
    generationRef.current += 1;
    setAccessToken(null);
    queryClient.removeQueries({ queryKey: currentUserKey });
  }, [queryClient, setAccessToken]);

  const refreshAccessToken = useCallback((): Promise<string | null> => {
    if (loggingOutRef.current) return Promise.resolve(null);
    if (refreshRef.current) return refreshRef.current;
    const generation = generationRef.current;
    const pending = refresh()
      .then(({ access_token }) => {
        if (generation !== generationRef.current) return null;
        setAccessToken(access_token);
        return access_token;
      })
      .finally(() => {
        if (refreshRef.current === pending) refreshRef.current = null;
      });
    refreshRef.current = pending;
    return pending;
  }, [setAccessToken]);

  useEffect(() => {
    configureApiAuth({
      getAccessToken: () => tokenRef.current,
      refreshAccessToken,
      onAuthFailure: clearAuth,
    });
    void refreshAccessToken()
      .catch(() => {
        if (!tokenRef.current) clearAuth();
      })
      .finally(() => setIsRestoring(false));
    return () => configureApiAuth(null);
  }, [clearAuth, refreshAccessToken]);

  const currentUser = useQuery({
    queryKey: currentUserKey,
    queryFn: getCurrentUser,
    enabled: Boolean(token) && !isRestoring,
    staleTime: 0,
    retry: false,
  });

  const acceptToken = (accessToken: string) => {
    generationRef.current += 1;
    queryClient.removeQueries({ queryKey: currentUserKey });
    setAccessToken(accessToken);
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ access_token }) => acceptToken(access_token),
  });
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: ({ access_token }) => acceptToken(access_token),
  });
  const logoutMutation = useMutation({
    mutationFn: async () => {
      loggingOutRef.current = true;
      await refreshRef.current?.catch(() => null);
      await logout();
    },
    onSuccess: () => {
      clearAuth();
      loggingOutRef.current = false;
    },
    onError: () => {
      loggingOutRef.current = false;
    },
  });

  const value: AuthContextValue = {
    user: token ? currentUser.data ?? null : null,
    isRestoring,
    isUserLoading: Boolean(token) && currentUser.isPending,
    isUserError: Boolean(token) && currentUser.isError,
    retryUser: () => void currentUser.refetch(),
    login: async (credentials) => { await loginMutation.mutateAsync(credentials); },
    register: async (credentials) => { await registerMutation.mutateAsync(credentials); },
    logout: async () => { await logoutMutation.mutateAsync(); },
    isLoggingOut: logoutMutation.isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
