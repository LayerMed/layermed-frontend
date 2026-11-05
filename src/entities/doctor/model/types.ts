export interface DoctorReadDto {
  id: number;
  user_id: number;
  education: string;
  degree: string | null;
  experience_years: number;
  bio: string;
  min_price: number;
  clinic: string;
  avatar_url: string | null;
  rating_avg: number;
  reviews_count: number;
  status: string;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface DoctorsPageDto {
  items: DoctorReadDto[];
  limit: number;
  offset: number;
  total: number;
}

export interface DoctorDetailedDto extends DoctorReadDto {
  specialties: Array<{
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }>;
}
