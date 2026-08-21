import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui';
import { Doctor } from '../model/types';

interface DoctorCardProps {
  doctor: Doctor;
  isActive?: boolean;
}

export function DoctorCard({ doctor, isActive = false }: DoctorCardProps) {
  const {
    id,
    name,
    specialty,
    experience,
    rating,
    reviewsCount,
    avatarUrl,
    clinic,
    city = 'Ташкент',
    isOnline = true,
    price,
  } = doctor;

  const ratingPercentage = Math.min(100, Math.max(0, (rating / 5) * 100));

  const ratingBgColor = rating < 3 ? 'bg-red-500' : rating < 4 ? 'bg-amber-400' : 'bg-primary';
  const ratingTextColor = rating < 3 ? 'text-red-500' : rating < 4 ? 'text-amber-500' : 'text-primary';

  return (
    <article
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      className={`group relative flex flex-col justify-between max-w-[600px] w-full min-h-[227px] sm:h-[227px] mx-auto rounded-3xl bg-background p-[6px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] border border-black/5 overflow-hidden ${
        isActive
          ? '-translate-y-[10px] sm:-translate-y-[20px] shadow-hover-accent z-10 pointer-events-auto'
          : 'translate-y-0 shadow-card opacity-100 pointer-events-none select-none'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4 p-2 sm:p-0">
        <div className="relative w-[90px] h-[110px] sm:w-[120px] sm:h-[141px] shrink-0 overflow-hidden rounded-[20px] sm:rounded-[23px] bg-background border border-black/5">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 flex-1 py-0.5">
          <h3 className="text-xl sm:text-[26px] font-bold text-[#000] truncate mb-1 leading-tight">
            {name}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 truncate">
            <span className="text-[#0095ff] font-bold text-sm sm:text-[18px] truncate">{specialty}</span>
            <span className="text-[#95a8b4] font-semibold text-xs sm:text-[18px] shrink-0">Стаж {experience} лет</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-[100px] sm:w-[132px] h-[14px] rounded-full bg-background overflow-hidden border border-black/5 p-0.5 shrink-0">
              <div
                className={`h-full rounded-full transition-all duration-500 ${ratingBgColor}`}
                style={{ width: `${ratingPercentage}%` }}
              />
            </div>
            <span className={`text-xs font-bold ${ratingTextColor}`}>{rating.toFixed(1)}</span>
            <span className="text-[11px] text-foreground/50">{reviewsCount} отзывов</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center justify-center min-w-[100px] sm:w-[162px] h-[30px] sm:h-[35px] rounded-[30px] px-[10px] sm:px-[12px] py-[6px] sm:py-[8px] bg-primary/10 text-[#0095ff] font-semibold text-xs sm:text-[16px] truncate">
              {city || clinic}
            </span>
            {isOnline ? (
              <span className="inline-flex items-center justify-center min-w-[80px] sm:w-[162px] h-[30px] sm:h-[35px] rounded-[30px] px-[10px] sm:px-[12px] py-[6px] sm:py-[8px] bg-emerald-500/10 text-emerald-600 font-semibold text-xs sm:text-[16px]">
                Онлайн
              </span>
            ) : (
              <span className="inline-flex items-center justify-center min-w-[80px] sm:w-[162px] h-[30px] sm:h-[35px] rounded-[30px] px-[10px] sm:px-[12px] py-[6px] sm:py-[8px] bg-slate-500/10 text-slate-500 font-semibold text-xs sm:text-[16px]">
                Офлайн
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 p-2 sm:p-0 flex items-center justify-between gap-2 sm:gap-3">
        <span className="inline-flex items-center justify-center rounded-2xl bg-surface px-3 sm:px-4 h-[40px] sm:h-[46px] text-xs sm:text-[16px] font-semibold text-[#3a4e5b] whitespace-nowrap shrink-0">
          {price.reception} ₽ • За приём
        </span>

        <Link
          href={isActive ? `/doctors/${id}` : '#'}
          tabIndex={isActive ? 0 : -1}
          className={!isActive ? 'pointer-events-none' : ''}
        >
          <Button
            variant="accent"
            hasImage
            disabled={!isActive}
          >
            Подробнее
          </Button>
        </Link>
      </div>
    </article>
  );
}
