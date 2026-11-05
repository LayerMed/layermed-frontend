import { apiClient } from '@/shared/api/axios';
import type { CurrentUserDto, LoginCredentials, RegisterCredentials, TokenResponseDto } from '../model/types';

export async function login(credentials: LoginCredentials): Promise<TokenResponseDto> {
  const body = new URLSearchParams({
    username: credentials.email,
    password: credentials.password,
  });
  const { data } = await apiClient.post<TokenResponseDto>('/users/login', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return data;
}

export async function register(credentials: RegisterCredentials): Promise<TokenResponseDto> {
  const { data } = await apiClient.post<TokenResponseDto>('/users/register', credentials);
  return data;
}

export async function refresh(): Promise<TokenResponseDto> {
  const { data } = await apiClient.post<TokenResponseDto>('/users/refresh');
  return data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/users/logout');
}

export async function getCurrentUser(): Promise<CurrentUserDto> {
  const { data } = await apiClient.get<CurrentUserDto>('/users/me');
  return data;
}
