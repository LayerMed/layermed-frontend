export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  doctorsCount: number;
  isNew?: boolean;
}
