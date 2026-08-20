import { getCategories } from '../api/getCategories';
import { CategoryCard } from './CategoryCard';

export async function CategoriesHero() {
  const categories = await getCategories();

  return (
    <section className="p-5 bg-white rounded-[45px] my-6">
      <div className="px-3 mb-8">
        <h2 className="font-bold text-[40px] leading-[1.1] mb-3.5 text-foreground">
          Направления и специалисты
        </h2>
        <p className="max-w-[829px] text-[#95A8B4] font-medium">
          Выберите нужную категорию, чтобы найти подходящего врача и записаться на приём онлайн.
        </p>
      </div>

      {/* Сетка категорий */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
