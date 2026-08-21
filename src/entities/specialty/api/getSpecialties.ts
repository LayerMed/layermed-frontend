import { apiClient } from '@/shared/api/axios';
import { Specialty } from '../model/types';

export const getSpecialties = async (ids?: number[]): Promise<Specialty[]> => {
  const { data } = await apiClient.get<Specialty[]>('/specialties/', {
    params: ids?.length ? { ids } : undefined,
  });
  return data;
};
