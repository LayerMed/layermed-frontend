'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/shared/ui';
import { useSpecialties, useSpecialtyCounts } from '@/entities/specialty';
import { MOCK_CATEGORIES } from '../model/mockCategories';
import { mapSpecialtyDtoToCategory } from '../model/mapSpecialtyDtoToCategory';
import { CategoryCard } from './CategoryCard';

gsap.registerPlugin(ScrollTrigger);

export function CategoriesHeroClient() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const [showDemo, setShowDemo] = useState(false);
  const specialtiesQuery = useSpecialties();
  const countsQuery = useSpecialtyCounts();

  const countsById = new Map<number, number>();
  for (const count of countsQuery.data ?? []) {
    countsById.set(count.id, count.doctors_count);
  }

  const isDemo = !specialtiesQuery.data && specialtiesQuery.isError && showDemo;
  const categories = specialtiesQuery.data
    ? specialtiesQuery.data.map((specialty) =>
        mapSpecialtyDtoToCategory(specialty, countsById.get(specialty.id) ?? null)
      )
    : isDemo ? MOCK_CATEGORIES : [];
  const isLoading = !specialtiesQuery.data && specialtiesQuery.isPending;
  const hasError = !specialtiesQuery.data && specialtiesQuery.isError && !isDemo;
  const isEmpty = specialtiesQuery.isSuccess && categories.length === 0;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (icon1Ref.current) {
        gsap.to(icon1Ref.current, {
          y: 70,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (icon2Ref.current) {
        gsap.to(icon2Ref.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative p-5 pt-10 bg-white rounded-[45px] my-6 overflow-hidden">
      {/* Parallax icons */}
      <div
        ref={icon1Ref}
        className="pointer-events-none absolute top-10 left-4 opacity-15 text-primary z-0"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
        </svg>
      </div>

      <div
        ref={icon2Ref}
        className="pointer-events-none absolute bottom-12 right-6 opacity-20 text-secondary z-0"
      >
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 12.5l7-7a4.95 4.95 0 017 7l-7 7a4.95 4.95 0 01-7-7z" />
          <path d="M8.5 8.5l7 7" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="px-3 mb-8 text-center flex flex-col items-center">
          <h2 className="font-bold text-[40px] leading-[1.1] mb-3.5 text-foreground">
            Направления и специалисты
          </h2>
          <p className="max-w-[829px] text-[#95A8B4] font-medium">
            Выберите нужную категорию, чтобы найти подходящего врача и записаться на приём онлайн.
          </p>
        </div>

        {isDemo && (
          <div role="status" className="mx-3 mb-5 rounded-2xl bg-background p-4 text-sm text-foreground">
            Показаны демонстрационные категории. Данные врачей и количество в них не относятся к API.
            <Button type="button" onClick={() => void specialtiesQuery.refetch()} className="ml-3 !py-2">
              Повторить загрузку
            </Button>
          </div>
        )}

        {specialtiesQuery.data && countsQuery.isError && (
          <div role="alert" className="mx-3 mb-5 rounded-2xl bg-background p-4 text-sm text-foreground">
            Количество врачей временно недоступно.
            <Button type="button" onClick={() => void countsQuery.refetch()} className="ml-3 !py-2">
              Повторить
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-3" aria-busy={isLoading}>
          {isLoading && Array.from({ length: 6 }, (_, index) => (
            <div key={index} aria-hidden="true" className="min-h-[210px] animate-pulse rounded-2xl bg-background p-5">
              <div className="mb-5 h-6 w-2/3 rounded-md bg-primary/10" />
              <div className="mb-2 h-4 w-full rounded-md bg-primary/10" />
              <div className="mb-8 h-4 w-4/5 rounded-md bg-primary/10" />
              <div className="h-10 w-1/2 rounded-2xl bg-primary/10" />
            </div>
          ))}

          {hasError && (
            <div role="alert" className="col-span-full rounded-2xl bg-background p-6 text-center text-foreground">
              <p className="mb-4">Не удалось загрузить направления. Попробуйте ещё раз.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button type="button" onClick={() => void specialtiesQuery.refetch()} variant="accent">Повторить</Button>
                <Button type="button" onClick={() => setShowDemo(true)}>Показать демо</Button>
              </div>
            </div>
          )}

          {isEmpty && (
            <p role="status" className="col-span-full rounded-2xl bg-background p-6 text-center text-foreground">
              Направлений пока нет.
            </p>
          )}

          {categories.slice(0, 12).map((category, index) => (
            <div key={category.id} className={index >= 6 ? 'hidden md:block' : undefined}>
              <CategoryCard category={category} countLoading={!isDemo && countsQuery.isPending} />
            </div>
          ))}
        </div>

        {categories.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button type="button" variant="accent" hasImage onClick={() => router.push('/categories')}>
              Показать все категории
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
