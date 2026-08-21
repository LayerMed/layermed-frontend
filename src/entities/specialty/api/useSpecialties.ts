import { useQuery } from '@tanstack/react-query';
import { getSpecialties } from '../api/getSpecialties';
import { Specialty } from '../model/types';

export const specialtyKeys = {
  all: ['specialties'] as const,
  list: (ids?: number[]) => [...specialtyKeys.all, { ids }] as const,
};

export const useSpecialties = (ids?: number[]) => {
  return useQuery<Specialty[]>({
    queryKey: specialtyKeys.list(ids),
    queryFn: () => getSpecialties(ids),
  });
};
