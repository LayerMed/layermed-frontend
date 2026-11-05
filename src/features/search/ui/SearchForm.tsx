'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDoctorsBySpecialty } from '@/entities/doctor';
import { useSpecialties } from '@/entities/specialty';
import { Button, Input } from '@/shared/ui';
import { searchItems } from '../api/search';

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<number | null>(null);
  const specialtiesQuery = useSpecialties();
  const doctorsQuery = useQuery({
    queryKey: ['doctors', 'by-specialty', selectedSpecialtyId],
    queryFn: () => getDoctorsBySpecialty(selectedSpecialtyId!),
    enabled: selectedSpecialtyId !== null,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(searchQuery.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  const activeQuery = searchQuery.trim();
  const isTyping = activeQuery !== debouncedQuery && selectedSpecialtyId === null;
  const matches = !isTyping && selectedSpecialtyId === null
    ? searchItems({ query: debouncedQuery }, specialtiesQuery.data ?? [])
    : [];
  const selectedSpecialty = specialtiesQuery.data?.find((item) => item.id === selectedSpecialtyId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedSpecialtyId(null);
    setDebouncedQuery(searchQuery.trim());
  };

  return (
    <div id="doctor-search" className="w-full max-w-[658px] scroll-mt-6">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 bg-background w-full rounded-2xl sm:rounded-3xl"
      >
        <Input
          type="search"
          aria-label="Поиск направления"
          placeholder="Название направления или его описание"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setSelectedSpecialtyId(null);
          }}
          className="w-full"
        />

        <Button
          type="submit"
          variant="accent"
          className="w-full sm:w-auto shrink-0 justify-center min-w-[140px] md:min-w-[180px]"
        >
          Поиск
        </Button>
      </form>

      <p className="mt-2 px-2 text-xs text-foreground/60">
        Поиск по названиям и описаниям направлений. Поиск по именам врачей и симптомам пока недоступен.
      </p>

      {activeQuery && <div className="mt-3 rounded-2xl border border-primary/10 bg-surface p-3 shadow-card" aria-live="polite">
        {specialtiesQuery.isPending && <p role="status" className="p-3 text-sm text-foreground/70">Загружаем направления…</p>}
        {specialtiesQuery.isError && <div role="alert" className="p-3 text-sm text-foreground">
          <p className="mb-3">Не удалось загрузить направления.</p>
          <Button type="button" onClick={() => void specialtiesQuery.refetch()}>Повторить</Button>
        </div>}
        {specialtiesQuery.isSuccess && isTyping && <p role="status" className="p-3 text-sm text-foreground/70">Ищем…</p>}
        {specialtiesQuery.isSuccess && !isTyping && !selectedSpecialty && matches.length === 0 && <p role="status" className="p-3 text-sm text-foreground/70">
          {specialtiesQuery.data.length === 0 ? 'Направлений пока нет.' : 'Совпадений среди направлений нет. Попробуйте другое название.'}
        </p>}
        {specialtiesQuery.isSuccess && !selectedSpecialty && matches.length > 0 && <>
          <p className="px-3 pb-2 text-xs text-foreground/60">Найдено направлений: {matches.length}</p>
          <ul className="max-h-72 space-y-1 overflow-y-auto">
            {matches.slice(0, 8).map((specialty) => <li key={specialty.id}>
              <button
                type="button"
                onClick={() => {
                  setSelectedSpecialtyId(specialty.id);
                  setSearchQuery(specialty.name);
                  setDebouncedQuery(specialty.name);
                }}
                className="w-full rounded-xl px-3 py-2 text-left hover:bg-background focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="block font-semibold text-foreground">{specialty.name}</span>
                <span className="block text-xs text-foreground/60 line-clamp-2">{specialty.description}</span>
              </button>
            </li>)}
          </ul>
          {matches.length > 8 && <p className="px-3 pt-2 text-xs text-foreground/60">Показаны первые 8. Уточните запрос, чтобы увидеть остальные.</p>}
        </>}

        {selectedSpecialty && <div className="p-2">
          <h2 className="mb-2 font-semibold text-foreground">Врачи направления «{selectedSpecialty.name}»</h2>
          {doctorsQuery.isPending && <p role="status" className="text-sm text-foreground/70">Загружаем врачей…</p>}
          {doctorsQuery.isError && <div role="alert" className="text-sm text-foreground">
            <p className="mb-2">Не удалось загрузить врачей.</p>
            <Button type="button" onClick={() => void doctorsQuery.refetch()}>Повторить</Button>
          </div>}
          {doctorsQuery.isSuccess && doctorsQuery.data.total === 0 && <p role="status" className="text-sm text-foreground/70">Врачей по этому направлению пока нет.</p>}
          {doctorsQuery.isSuccess && doctorsQuery.data.total > 0 && <>
            <p className="mb-2 text-xs text-foreground/60">Показаны {doctorsQuery.data.items.length} из {doctorsQuery.data.total} врачей.</p>
            <ul className="max-h-72 space-y-2 overflow-y-auto">
              {doctorsQuery.data.items.map((doctor) => <li key={doctor.id} className="rounded-xl bg-background px-3 py-2 text-sm text-foreground">
                <span className="font-semibold">Врач №{doctor.id}</span>
                <span className="ml-2 text-foreground/70">{doctor.clinic || 'Клиника не указана'} · Стаж {doctor.experience_years} лет</span>
                {doctor.reviews_count > 0 && <span className="block text-xs text-foreground/60">Рейтинг {doctor.rating_avg.toFixed(1)} · {doctor.reviews_count} отзывов</span>}
              </li>)}
            </ul>
          </>}
        </div>}
      </div>}
    </div>
  );
};
