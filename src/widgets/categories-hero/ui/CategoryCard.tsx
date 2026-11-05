'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';
import { Category } from '../model/types';

interface CategoryCardProps {
  category: Category;
  countLoading?: boolean;
}

export function CategoryCard({ category, countLoading = false }: CategoryCardProps) {
  const router = useRouter();
  const { id, title, description, doctorsCount, isNew } = category;

  return (
    <article className="group relative flex flex-col justify-between w-full rounded-2xl bg-background p-5 transition-all border border-black/5">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold text-foreground">
            {title}
          </h3>
          {isNew && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shrink-0">
              Новая услуга
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-foreground/70 mb-5">
          {description}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center rounded-2xl bg-surface px-[15px] py-[13.5px] text-[16px] font-semibold text-[#3a4e5b]"
          aria-label={doctorsCount === null ? countLoading ? 'Количество врачей загружается' : 'Количество врачей недоступно' : undefined}
        >
          {doctorsCount === null ? countLoading ? '… врачей' : '— врачей' : `${doctorsCount} врачей`}
        </span>

        <Button type="button" variant="accent" hasImage onClick={() => router.push(`/doctors?specialty_ids=${id}`)}>
          Выбрать врача
        </Button>
      </div>
    </article>
  );
}
