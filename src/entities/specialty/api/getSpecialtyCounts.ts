import { apiClient } from '@/shared/api/axios';
import type { SpecialtyCountReadDto } from '../model/types';

export const getSpecialtyCounts = async (): Promise<SpecialtyCountReadDto[]> => {
  const { data } = await apiClient.get<SpecialtyCountReadDto[]>('/specialties/count');
  return data;
};
