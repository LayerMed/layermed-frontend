export interface Category {
  id: number;
  title: string;
  description: string;
  doctorsCount: number | null;
  isNew?: boolean;
}
