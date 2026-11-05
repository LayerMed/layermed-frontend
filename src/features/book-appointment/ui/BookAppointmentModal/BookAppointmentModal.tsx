'use client';

import { useState, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { OfferReadDto } from '@/entities/offer';
import { LoginForm, RegisterForm, useAuth } from '@/features/auth';
import { Button, Input, Modal } from '@/shared/ui';
import { createBooking } from '../../api/createBooking';

interface BookAppointmentModalProps {
  offer: OfferReadDto;
  onClose: () => void;
}

export default function BookAppointmentModal({ offer, onClose }: BookAppointmentModalProps) {
  const auth = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const booking = useMutation({ mutationFn: createBooking });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);
    const date = new Date(appointmentTime);
    if (!Number.isFinite(date.getTime()) || date.getTime() <= Date.now()) {
      setValidationError('Выберите дату и время в будущем.');
      return;
    }
    booking.mutate({ offer_id: offer.id, appointment_time: date.toISOString() });
  }

  let requestError: string | null = null;
  if (booking.isError) {
    if (axios.isAxiosError(booking.error)) {
      const status = booking.error.response?.status;
      requestError = status === 401
        ? 'Сессия завершилась. Войдите и попробуйте снова.'
        : status === 404
          ? 'Это предложение больше недоступно.'
          : status === 422
            ? 'Проверьте дату и время заявки.'
            : status === 429
              ? 'Слишком много попыток. Попробуйте позже.'
              : 'Не удалось отправить заявку. Попробуйте ещё раз.';
    } else {
      requestError = 'Не удалось отправить заявку. Попробуйте ещё раз.';
    }
  }

  return <Modal open onClose={() => { if (!booking.isPending) onClose(); }} title="Запись на услугу">
    <div className="mb-5 rounded-2xl bg-background p-4 text-foreground">
      <p className="font-semibold">{offer.title}</p>
      <p className="mt-1 text-sm text-foreground/70">Предложение №{offer.id} · Врач №{offer.doctor_id}</p>
      <p className="mt-1 text-sm">Стоимость: {offer.cost.toLocaleString('ru-RU')} <span className="text-foreground/60">(валюта не указана API)</span></p>
    </div>

    {booking.isSuccess ? <div role="status" className="space-y-4 text-foreground">
      <p className="font-semibold text-success">Заявка №{booking.data.id} отправлена.</p>
      <p className="text-sm">Статус: ожидает подтверждения. Выбранное время не является подтверждённым свободным слотом.</p>
      <Button type="button" variant="accent" onClick={onClose}>Готово</Button>
    </div> : auth.isRestoring || auth.isUserLoading ? (
      <p role="status" className="text-sm text-foreground/70">Проверяем сессию…</p>
    ) : auth.isUserError ? (
      <div role="alert" className="space-y-3 text-sm text-foreground">
        <p>Не удалось загрузить профиль.</p>
        <Button type="button" onClick={auth.retryUser}>Повторить</Button>
      </div>
    ) : !auth.user ? (
      <div>
        <p className="mb-4 text-sm text-foreground/70">Чтобы отправить заявку, войдите или зарегистрируйтесь.</p>
        {authMode === 'login' ? (
          <LoginForm onSuccess={() => {}} onSwitchToRegister={() => setAuthMode('register')} />
        ) : (
          <RegisterForm onSuccess={() => {}} onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    ) : <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-semibold text-foreground">
        Желаемые дата и время
        <Input
          type="datetime-local"
          required
          value={appointmentTime}
          onChange={(event) => setAppointmentTime(event.target.value)}
          wrapperClassName="mt-1 bg-background"
        />
      </label>
      <p className="text-xs text-foreground/70">Укажите время в вашем часовом поясе. Свободные слоты API не предоставляет; заявку подтвердят отдельно.</p>
      {validationError && <p role="alert" className="text-sm text-error">{validationError}</p>}
      {requestError && <p role="alert" className="text-sm text-error">{requestError}</p>}
      <Button type="submit" variant="accent" disabled={booking.isPending}>
        {booking.isPending ? 'Отправляем…' : 'Отправить заявку'}
      </Button>
    </form>}
  </Modal>;
}
