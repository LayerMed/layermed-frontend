import { apiClient } from '@/shared/api/axios';
import type { DoctorsPageDto } from '../model/types';

export async function getDoctorsBySpecialty(specialtyId: number): Promise<DoctorsPageDto> {
  const { data } = await apiClient.get<DoctorsPageDto>('/doctors/', {
    params: { specialty_ids: specialtyId, limit: 9 },
  });
  return data;
}
