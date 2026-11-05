export interface DoctorPrice {
  reception: number;
  examination: number;
  consultation: number;
}

export interface Doctor {
  id: string;
  name: string | null;
  specialty: string | null;
  experience: number;
  rating: number;
  reviewsCount: number;
  avatarUrl: string | null;
  clinic: string;
  city?: string | null;
  isOnline?: boolean | null;
  minPrice?: number | null;
  price?: DoctorPrice;
}
