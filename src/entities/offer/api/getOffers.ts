import { apiClient } from '@/shared/api/axios';
import type { OffersPageDto } from '../model/types';

export async function getOffers(offset = 0): Promise<OffersPageDto> {
  const { data } = await apiClient.get<OffersPageDto>('/offers/', {
    params: { limit: 12, offset },
  });
  return data;
}
