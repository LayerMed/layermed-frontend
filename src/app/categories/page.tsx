import { Hero } from '@/widgets/hero';
import { Footer } from '@/widgets/footer';
import { CategoriesDirectory } from '@/views/categories/ui/CategoriesDirectory';

export default function CategoriesPage() {
  return <main><Hero primaryHeading={false} /><CategoriesDirectory /><Footer /></main>;
}
