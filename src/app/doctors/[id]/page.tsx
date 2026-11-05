import { notFound } from 'next/navigation';
import { Hero } from '@/widgets/hero';
import { Footer } from '@/widgets/footer';
import { DoctorDetail } from '@/views/doctors/ui/DoctorDetail';

export default async function DoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const doctorId = Number(id);
  if (!Number.isSafeInteger(doctorId) || doctorId <= 0) notFound();
  return <main><Hero primaryHeading={false} /><DoctorDetail doctorId={doctorId} /><Footer /></main>;
}
