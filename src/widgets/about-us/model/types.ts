export interface AboutStatsData {
  doctorsCount: number;
  usersCount: number;
  averageRating: number;
}

export interface AboutUsProps {
  title?: string;
  subtitle?: string;
  initialStats?: AboutStatsData;
}
