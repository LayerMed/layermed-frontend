import { apiClient } from '@/shared/api/axios';
import type { SpecialtyReadDto } from '../model/types';

export const getSpecialties = async (): Promise<SpecialtyReadDto[]> => {
  const { data } = await apiClient.get<SpecialtyReadDto[]>('/specialties/');
  return data;
};
