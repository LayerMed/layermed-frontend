import { Hero } from '@/widgets/hero';
import { Footer } from '@/widgets/footer';
import { DoctorsDirectory } from '@/views/doctors/ui/DoctorsDirectory';

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ specialty_ids?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawId = params.specialty_ids;
  const parsedId = typeof rawId === 'string' && /^\d+$/.test(rawId) ? Number(rawId) : null;
  const specialtyId = parsedId && Number.isSafeInteger(parsedId) && parsedId > 0 ? parsedId : null;
  return <main><Hero primaryHeading={false} /><DoctorsDirectory key={specialtyId ?? 'all'} specialtyId={specialtyId} /><Footer /></main>;
}
