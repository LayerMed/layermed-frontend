import { apiClient } from '@/shared/api/axios';
import type { DoctorDetailedDto } from '../model/types';

export async function getDoctorDetail(id: number): Promise<DoctorDetailedDto> {
  const { data } = await apiClient.get<DoctorDetailedDto>(`/doctors/${id}`);
  return data;
}
