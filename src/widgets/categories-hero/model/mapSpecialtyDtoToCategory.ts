import type { SpecialtyReadDto } from '@/entities/specialty';
import type { Category } from './types';

export function mapSpecialtyDtoToCategory(
  specialty: SpecialtyReadDto,
  doctorsCount: number | null
): Category {
  return {
    id: specialty.id,
    title: specialty.name,
    description: specialty.description,
    doctorsCount,
  };
}
