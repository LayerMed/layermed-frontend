export interface DoctorPrice {
  reception: number;
  examination: number;
  consultation: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  clinic: string;
  city?: string;
  isOnline?: boolean;
  price: DoctorPrice;
}
