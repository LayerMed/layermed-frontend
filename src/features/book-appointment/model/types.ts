export interface BookingCreateDto {
  offer_id: number;
  appointment_time: string;
}

export interface BookingReadDto extends BookingCreateDto {
  id: number;
  user_id: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  created_at: string;
  updated_at: string;
}
