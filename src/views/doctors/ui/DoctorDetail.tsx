'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getDoctorDetail } from '@/entities/doctor';
import { Button } from '@/shared/ui';

export function DoctorDetail({ doctorId }: { doctorId: number }) {
  const doctor = useQuery({
    queryKey: ['doctors', 'detail', doctorId],
    queryFn: () => getDoctorDetail(doctorId),
  });
  const notFound = axios.isAxiosError(doctor.error) && doctor.error.response?.status === 404;

  return <section className="my-6 rounded-[45px] bg-surface p-5 pt-10">
    <div className="mx-auto max-w-3xl px-3">
      {doctor.isPending && <p role="status" className="p-6 text-foreground/70">Загружаем профиль врача…</p>}
      {doctor.isError && <div role="alert" className="p-6 text-foreground">
        <p className="mb-3">{notFound ? 'Врач не найден.' : 'Не удалось загрузить профиль врача.'}</p>
        {notFound ? <Link href="/doctors" className="font-semibold text-primary hover:underline">К списку врачей</Link> : <Button type="button" onClick={() => void doctor.refetch()}>Повторить</Button>}
      </div>}
      {doctor.data && <>
        <h1 className="mb-2 text-[40px] font-bold text-foreground">Врач №{doctor.data.id}</h1>
        <p className="mb-6 text-sm text-foreground/60">Имя врача не предоставлено публичным API.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-background p-4"><span className="block text-xs text-foreground/60">Клиника</span><span className="font-semibold">{doctor.data.clinic || 'Не указана'}</span></div>
          <div className="rounded-2xl bg-background p-4"><span className="block text-xs text-foreground/60">Стаж</span><span className="font-semibold">{doctor.data.experience_years} лет</span></div>
          <div className="rounded-2xl bg-background p-4"><span className="block text-xs text-foreground/60">Образование</span><span className="font-semibold">{doctor.data.education}</span></div>
          <div className="rounded-2xl bg-background p-4"><span className="block text-xs text-foreground/60">Учёная степень</span><span className="font-semibold">{doctor.data.degree || 'Не указана'}</span></div>
        </div>
        {doctor.data.specialties.length > 0 && <div className="mt-6">
          <h2 className="mb-2 text-xl font-bold text-foreground">Направления</h2>
          <ul className="flex flex-wrap gap-2">{doctor.data.specialties.map((item) => <li key={item.id} className="rounded-full bg-primary/10 px-3 py-2 text-sm text-primary">{item.name}</li>)}</ul>
        </div>}
        {doctor.data.bio && <div className="mt-6"><h2 className="mb-2 text-xl font-bold text-foreground">О враче</h2><p className="whitespace-pre-wrap text-foreground/70">{doctor.data.bio}</p></div>}
        <p className="mt-6 text-sm text-foreground/60">Для записи выберите опубликованное предложение этого врача в разделе услуг. Публичный API пока не позволяет отфильтровать предложения по врачу.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/#booking-offers" className="inline-flex rounded-2xl bg-primary px-4 py-3 font-semibold text-surface hover:shadow-hover-accent">Смотреть услуги</Link>
          <Link href="/doctors" className="inline-flex rounded-2xl bg-background px-4 py-3 font-semibold text-foreground">К списку врачей</Link>
        </div>
      </>}
    </div>
  </section>;
}
