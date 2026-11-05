import { useQuery } from '@tanstack/react-query';
import { getDoctors } from './getDoctors';

export function useDoctors() {
  return useQuery({
    queryKey: ['doctors', 'list', { limit: 9 }],
    queryFn: getDoctors,
  });
}
