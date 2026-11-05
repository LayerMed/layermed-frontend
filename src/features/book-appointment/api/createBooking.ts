import { apiClient } from '@/shared/api/axios';
import type { BookingCreateDto, BookingReadDto } from '../model/types';

export async function createBooking(booking: BookingCreateDto): Promise<BookingReadDto> {
  const { data } = await apiClient.post<BookingReadDto>('/bookings/create', booking);
  return data;
}
