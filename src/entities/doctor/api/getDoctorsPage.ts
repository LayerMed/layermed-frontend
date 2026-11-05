import { apiClient } from '@/shared/api/axios';
import type { DoctorsPageDto } from '../model/types';

export interface DoctorsPageParams {
  limit: number;
  offset: number;
  specialtyId?: number;
}

export async function getDoctorsPage({ limit, offset, specialtyId }: DoctorsPageParams): Promise<DoctorsPageDto> {
  const { data } = await apiClient.get<DoctorsPageDto>('/doctors/', {
    params: { limit, offset, ...(specialtyId ? { specialty_ids: specialtyId } : {}) },
  });
  return data;
}
