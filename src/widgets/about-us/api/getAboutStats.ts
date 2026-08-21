import { MOCK_DOCTORS } from '@/widgets/doctors-slider/api/getDoctors';

export interface AboutStats {
  doctorsCount: number;
  usersCount: number;
  averageRating: number;
}

export async function getAboutStats(): Promise<AboutStats> {
  const totalRating = MOCK_DOCTORS.reduce((sum, doc) => sum + doc.rating, 0);
  const avgRating = Number((totalRating / MOCK_DOCTORS.length).toFixed(1));

  return {
    doctorsCount: 150,
    usersCount: 12500,
    averageRating: avgRating,
  };
}
