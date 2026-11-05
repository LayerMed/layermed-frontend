import { apiClient } from '@/shared/api/axios';
import type { DoctorsPageDto } from '../model/types';

export async function getDoctors(): Promise<DoctorsPageDto> {
  const { data } = await apiClient.get<DoctorsPageDto>('/doctors/', {
    params: { limit: 9 },
  });
  return data;
}
