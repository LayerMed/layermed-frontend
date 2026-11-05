'use client';

import { useSpecialties, useSpecialtyCounts } from '@/entities/specialty';
import { CategoryCard, mapSpecialtyDtoToCategory } from '@/widgets/categories-hero';
import { Button } from '@/shared/ui';

export function CategoriesDirectory() {
  const specialties = useSpecialties();
  const counts = useSpecialtyCounts();
  const countsById = new Map((counts.data ?? []).map((item) => [item.id, item.doctors_count]));

  return <section className="my-6 rounded-[45px] bg-surface p-5 pt-10">
    <div className="mb-8 text-center">
      <h1 className="text-[40px] font-bold text-foreground">Медицинские направления</h1>
      <p className="text-foreground/60">Выберите направление, чтобы посмотреть врачей.</p>
    </div>
    {specialties.isPending && <p role="status" className="p-6 text-center text-foreground/70">Загружаем направления…</p>}
    {specialties.isError && <div role="alert" className="p-6 text-center text-foreground">
      <p className="mb-3">Не удалось загрузить направления.</p>
      <Button type="button" onClick={() => void specialties.refetch()}>Повторить</Button>
    </div>}
    {specialties.isSuccess && specialties.data.length === 0 && <p role="status" className="p-6 text-center text-foreground/70">Направлений пока нет.</p>}
    {specialties.data && counts.isError && <div role="alert" className="mb-4 p-4 text-center text-sm text-foreground">
      Количество врачей недоступно. <Button type="button" onClick={() => void counts.refetch()}>Повторить</Button>
    </div>}
    {specialties.data && <div className="grid gap-6 px-3 sm:grid-cols-2 lg:grid-cols-3">
      {specialties.data.map((item) => <CategoryCard key={item.id} category={mapSpecialtyDtoToCategory(item, countsById.get(item.id) ?? null)} countLoading={counts.isPending} />)}
    </div>}
  </section>;
}
