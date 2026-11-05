'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useOffers, type OfferFormat, type OfferReadDto } from '@/entities/offer';
import { BookAppointmentModal } from '@/features/book-appointment';
import { Button } from '@/shared/ui';

const formatLabels: Record<OfferFormat, string> = {
  clinic: 'В клинике',
  online: 'Онлайн',
  home_visit: 'Выезд на дом',
  chat: 'Чат',
};

export function BookingOffers() {
  const offersQuery = useOffers();
  const [selectedOffer, setSelectedOffer] = useState<OfferReadDto | null>(null);
  const offers = offersQuery.data?.pages.flatMap((page) => page.items) ?? [];

  return <section id="booking-offers" className="my-6 rounded-[45px] bg-surface p-5 pt-10 scroll-mt-6">
    <div className="mb-8 flex flex-col items-center px-3 text-center">
      <h2 className="mb-3.5 text-[40px] font-bold leading-[1.1] text-foreground">Услуги и запись</h2>
      <p className="max-w-[829px] font-medium text-foreground/60">Выберите предложение врача и отправьте заявку на удобное время.</p>
    </div>

    {offersQuery.isPending && <div role="status" aria-label="Загрузка услуг" className="grid gap-5 px-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => <div key={index} aria-hidden="true" className="h-56 animate-pulse rounded-2xl bg-background" />)}
    </div>}
    {offersQuery.isError && offers.length === 0 && <div role="alert" className="mx-3 rounded-2xl bg-background p-6 text-center text-foreground">
      <p className="mb-4">Не удалось загрузить услуги.</p>
      <Button type="button" onClick={() => void offersQuery.refetch()}>Повторить</Button>
    </div>}
    {offersQuery.isSuccess && offers.length === 0 && <p role="status" className="mx-3 rounded-2xl bg-background p-6 text-center text-foreground">Доступных предложений пока нет.</p>}

    {offers.length > 0 && <div className="grid gap-5 px-3 sm:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => <article key={offer.id} className="flex flex-col rounded-3xl bg-background p-5 shadow-card">
        <p className="mb-2 text-xs font-semibold text-primary">{formatLabels[offer.offer_format] ?? 'Формат не указан'}</p>
        <h3 className="mb-2 text-xl font-bold text-foreground">{offer.title}</h3>
        <p className="mb-4 line-clamp-3 text-sm text-foreground/70">{offer.description}</p>
        <p className="mt-auto mb-3 text-sm text-foreground/70"><Link href={`/doctors/${offer.doctor_id}`} className="font-semibold text-primary hover:underline">Врач №{offer.doctor_id}</Link> · Предложение №{offer.id}</p>
        <p className="mb-4 font-semibold text-foreground">Стоимость: {offer.cost.toLocaleString('ru-RU')} <span className="text-xs font-normal text-foreground/60">(валюта не указана API)</span></p>
        <Button type="button" variant="accent" onClick={() => setSelectedOffer(offer)}>Записаться</Button>
      </article>)}
    </div>}

    {offersQuery.isFetchNextPageError && <div role="alert" className="mt-5 text-center text-sm text-foreground">
      <p>Не удалось загрузить следующую страницу.</p>
      <Button type="button" onClick={() => void offersQuery.fetchNextPage()}>Повторить</Button>
    </div>}
    {offersQuery.hasNextPage && !offersQuery.isFetchNextPageError && <div className="mt-8 flex justify-center">
      <Button type="button" onClick={() => void offersQuery.fetchNextPage()} disabled={offersQuery.isFetchingNextPage}>
        {offersQuery.isFetchingNextPage ? 'Загружаем…' : 'Показать ещё'}
      </Button>
    </div>}

    {selectedOffer && <BookAppointmentModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />}
  </section>;
}
