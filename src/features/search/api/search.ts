import type { SpecialtyReadDto } from '@/entities/specialty';

export interface SearchParams {
  query: string;
}

export function searchItems(params: SearchParams, specialties: SpecialtyReadDto[]): SpecialtyReadDto[] {
  const term = params.query.trim().toLocaleLowerCase('ru-RU');
  if (!term) return [];

  return specialties.filter((specialty) =>
    `${specialty.name} ${specialty.description}`.toLocaleLowerCase('ru-RU').includes(term)
  );
}

