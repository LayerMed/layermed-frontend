'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDoctorsPage } from '@/entities/doctor';
import { useSpecialties } from '@/entities/specialty';
import { DoctorCard, mapDoctorDtoToDoctor } from '@/widgets/doctors-slider';
import { Button } from '@/shared/ui';

const pageSize = 12;

export function DoctorsDirectory({ specialtyId }: { specialtyId: number | null }) {
  const [offset, setOffset] = useState(0);
  const specialties = useSpecialties();
  const doctors = useQuery({
    queryKey: ['doctors', 'directory', { specialtyId, offset, limit: pageSize }],
    queryFn: () => getDoctorsPage({ limit: pageSize, offset, specialtyId: specialtyId ?? undefined }),
  });
  const specialtyName = specialties.data?.find((item) => item.id === specialtyId)?.name;

  return <section className="my-6 rounded-[45px] bg-surface p-5 pt-10">
    <div className="mb-8 text-center">
      <h1 className="text-[40px] font-bold text-foreground">Список врачей</h1>
      {specialtyId && <p className="text-foreground/60">{specialtyName ? `Направление: ${specialtyName}` : `Направление №${specialtyId}`}</p>}
    </div>
    {doctors.isPending && <div role="status" aria-label="Загрузка врачей" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => <div key={index} aria-hidden="true" className="h-[227px] animate-pulse rounded-3xl bg-background" />)}
    </div>}
    {doctors.isError && <div role="alert" className="p-6 text-center text-foreground">
      <p className="mb-3">Не удалось загрузить врачей.</p>
      <Button type="button" onClick={() => void doctors.refetch()}>Повторить</Button>
    </div>}
    {doctors.isSuccess && doctors.data.total === 0 && <p role="status" className="p-6 text-center text-foreground/70">Врачей по этому запросу пока нет.</p>}
    {doctors.data && <>
      <p className="mb-5 text-center text-sm text-foreground/60">Показаны {doctors.data.items.length} из {doctors.data.total} врачей</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.data.items.map((item) => <DoctorCard key={item.id} doctor={mapDoctorDtoToDoctor(item)} isActive />)}
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <Button type="button" disabled={offset === 0} onClick={() => setOffset((value) => Math.max(0, value - pageSize))}>Назад</Button>
        <Button type="button" disabled={offset + doctors.data.limit >= doctors.data.total} onClick={() => setOffset((value) => value + pageSize)}>Далее</Button>
      </div>
    </>}
  </section>;
}
