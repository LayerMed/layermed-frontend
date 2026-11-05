import type { DoctorReadDto } from '@/entities/doctor';
import type { Doctor } from './types';

export function mapDoctorDtoToDoctor(dto: DoctorReadDto): Doctor {
  return {
    id: String(dto.id),
    name: null,
    specialty: null,
    experience: dto.experience_years,
    rating: dto.rating_avg,
    reviewsCount: dto.reviews_count,
    // The API currently returns an S3 object key, not a public image URL.
    avatarUrl: dto.avatar_url?.startsWith('https://images.unsplash.com/') ? dto.avatar_url : null,
    clinic: dto.clinic,
    city: null,
    isOnline: null,
    minPrice: dto.min_price > 0 ? dto.min_price : null,
  };
}
