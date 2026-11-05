export type OfferFormat = 'clinic' | 'online' | 'home_visit' | 'chat';

export interface OfferReadDto {
  id: number;
  doctor_id: number;
  city_id: number;
  title: string;
  description: string;
  cost: number;
  status: string;
  rejection_reason: string | null;
  offer_format: OfferFormat;
  images: string[] | null;
}

export interface OffersPageDto {
  items: OfferReadDto[];
  limit: number;
  offset: number;
  total: number;
}
