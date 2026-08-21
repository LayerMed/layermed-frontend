import { getCategories } from '../api/getCategories';
import { CategoriesHeroClient } from './CategoriesHeroClient';

export async function CategoriesHero() {
  const categories = await getCategories();

  return <CategoriesHeroClient categories={categories} />;
}
