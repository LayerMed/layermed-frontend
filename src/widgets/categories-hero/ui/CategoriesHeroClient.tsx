'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/shared/ui';
import { Category } from '../model/types';
import { CategoryCard } from './CategoryCard';

gsap.registerPlugin(ScrollTrigger);

interface CategoriesHeroClientProps {
  categories: Category[];
}

export function CategoriesHeroClient({ categories }: CategoriesHeroClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);

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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-3">
          {categories.slice(0, 12).map((category, index) => (
            <div
              key={category.id}
              className={index >= 6 ? 'hidden md:block' : undefined}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/categories">
            <Button variant="accent" hasImage>
              Показать все категории
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
