import Link from 'next/link';
import { Category } from '../model/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { title, description, doctorsCount, slug, isNew } = category;

  return (
    <article className="group relative flex flex-col justify-between w-[448px] max-w-full rounded-2xl bg-background p-6 transition-all border border-black/5">
      <div>
        {/* Шапка карточки: Заголовок и Бейджи */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            {isNew && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Новая услуга
              </span>
            )}
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {doctorsCount} врачей
            </span>
          </div>
        </div>

        {/* Описание категории */}
        <p className="text-sm leading-relaxed text-foreground/70 mb-5">
          {description}
        </p>
      </div>

      {/* Кнопка перехода */}
      <Link
        href={`/doctors?category=${slug}`}
        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm"
      >
        Выбрать врача
      </Link>
    </article>
  );
}
