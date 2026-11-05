import { useInfiniteQuery } from '@tanstack/react-query';
import { getOffers } from './getOffers';

export function useOffers() {
  return useInfiniteQuery({
    queryKey: ['offers', 'list'],
    queryFn: ({ pageParam }) => getOffers(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.items.length === lastPage.limit
      ? lastPage.offset + lastPage.limit
      : undefined,
  });
}
