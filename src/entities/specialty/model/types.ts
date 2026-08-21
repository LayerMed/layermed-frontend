export interface Specialty {
  id: number;
  name: string;
  description: string;
  doctorsCount?: number;
  slug?: string;
  isNew?: boolean;
  created_at: string;
  updated_at: string;
}

