import type { DoctorReadDto } from '@/entities/doctor';

export interface TokenResponseDto {
  access_token: string;
  token_type: string;
}

export interface CurrentUserDto {
  id: number;
  name: string;
  birth_date: string | null;
  city_id: number | null;
  email: string;
  role: string;
  token_version: number;
  created_at: string;
  updated_at: string;
  doctor: DoctorReadDto | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}
