import { useQuery } from '@tanstack/react-query';
import { getSpecialties } from './getSpecialties';
import { getSpecialtyCounts } from './getSpecialtyCounts';

export const specialtyKeys = {
  all: ['specialties'] as const,
  list: () => [...specialtyKeys.all, 'list'] as const,
  counts: () => [...specialtyKeys.all, 'counts'] as const,
};

export const useSpecialties = () => {
  return useQuery({
    queryKey: specialtyKeys.list(),
    queryFn: getSpecialties,
  });
};

export const useSpecialtyCounts = () => {
  return useQuery({
    queryKey: specialtyKeys.counts(),
    queryFn: getSpecialtyCounts,
  });
};
