export interface SpecialtyReadDto {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface SpecialtyCountReadDto {
  id: number;
  name: string;
  doctors_count: number;
}
