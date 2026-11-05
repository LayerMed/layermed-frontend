'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from '@/widgets/header';
import { SearchForm } from '@/features/search';

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ primaryHeading = true }: { primaryHeading?: boolean }) => {
  const Heading = primaryHeading ? 'h1' : 'p';
  const containerRef = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const icon4Ref = useRef<HTMLDivElement>(null);
  const icon5Ref = useRef<HTMLDivElement>(null);
  const icon6Ref = useRef<HTMLDivElement>(null);
  const icon7Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = [
        { ref: icon1Ref.current, y: 100 },
        { ref: icon2Ref.current, y: -80 },
        { ref: icon3Ref.current, y: 120 },
        { ref: icon4Ref.current, y: -100 },
        { ref: icon5Ref.current, y: 140 },
        { ref: icon6Ref.current, y: -90 },
        { ref: icon7Ref.current, y: 110 },
      ];

      items.forEach(({ ref, y }) => {
        if (ref) {
          gsap.to(ref, {
            y,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const badges = [
    { id: 1, label: 'Направления врачей', bgClass: 'bg-[#D7F1FF]', textClass: 'text-[#1F79AA]', shadowClass: 'shadow-[0px_9px_10px_-5px_#D7F1FF99]' },
    { id: 2, label: 'Предложения услуг', bgClass: 'bg-[#E8FFB3]', textClass: 'text-[#007600]', shadowClass: '' },
    { id: 3, label: 'Отзывы пациентов', bgClass: 'bg-[#FFF6B5]', textClass: 'text-[#8F5100]', shadowClass: '' },
    { id: 4, label: 'Заявка на приём', bgClass: 'bg-[#E7E2FF]', textClass: 'text-[#4C4085]', shadowClass: '' },
  ];

  return (
    <section ref={containerRef} className="relative p-4 sm:p-6 md:p-8 bg-white rounded-[32px] sm:rounded-[45px] overflow-hidden">
      {/* Decorative floating medical icons with GSAP parallax */}
      <div
        ref={icon1Ref}
        className="pointer-events-none absolute top-12 left-6 sm:left-12 opacity-15 text-primary z-0"
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
        </svg>
      </div>

      <div
        ref={icon2Ref}
        className="pointer-events-none absolute top-40 right-10 sm:right-24 opacity-20 text-secondary z-0"
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 12.5l7-7a4.95 4.95 0 017 7l-7 7a4.95 4.95 0 01-7-7z" />
          <path d="M8.5 8.5l7 7" />
        </svg>
      </div>

      <div
        ref={icon3Ref}
        className="pointer-events-none absolute bottom-28 left-1/3 opacity-15 text-[#34AAFF] z-0 hidden sm:block"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
        </svg>
      </div>

      <div
        ref={icon4Ref}
        className="pointer-events-none absolute bottom-16 right-1/4 opacity-20 text-emerald-400 z-0 hidden lg:block"
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Additional desktop floating parallax icons */}
      <div
        ref={icon5Ref}
        className="pointer-events-none absolute top-28 left-1/2 opacity-15 text-sky-400 z-0 hidden xl:block"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
        </svg>
      </div>

      <div
        ref={icon6Ref}
        className="pointer-events-none absolute top-1/2 right-12 opacity-20 text-cyan-500 z-0 hidden xl:block"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 12.5l7-7a4.95 4.95 0 017 7l-7 7a4.95 4.95 0 01-7-7z" />
          <path d="M8.5 8.5l7 7" />
        </svg>
      </div>

      <div
        ref={icon7Ref}
        className="pointer-events-none absolute top-16 right-1/3 opacity-15 text-indigo-400 z-0 hidden xl:block"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      <div className="relative z-10">
        <Header />

        <div className="flex items-center justify-between px-1 sm:px-3 mt-6 sm:mt-8">
          <div className="w-full lg:max-w-[65%]">
            <Heading className="font-bold text-[32px] sm:text-[42px] md:text-[50px] leading-[1.1] flex flex-col gap-0 mb-4 sm:mb-6">
              <span>Найдите врача</span>
              <span
                className="inline-block py-1 -my-1 text-[36px] sm:text-[48px] md:text-[60px] leading-[1.1] bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(180deg, #1170E3 0%, #6EC2FF 100%)'
                }}
              >
                Которому доверяете
              </span>
            </Heading>

            <p className="max-w-[829px] mb-8 sm:mb-12 text-sm sm:text-base text-[#95A8B4] font-medium leading-relaxed">
              Найдите подходящее направление, изучите предложения врачей и отправьте заявку на удобное время.
            </p>

            <SearchForm />
          </div>

          <div className="hidden lg:block shrink-0">
            <Image
              src="/hero-image.png"
              alt=""
              width={460}
              height={460}
              priority
              className="mb-8 mt-4 object-contain w-auto max-w-[400px] xl:max-w-[460px] h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`w-full gap-x-2.5 flex items-center justify-center py-[13.5px] px-4 rounded-2xl ${badge.bgClass} ${badge.textClass} ${badge.shadowClass}`.trim()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M10.49 2.23L5.49997 4.11C4.34997 4.54 3.40997 5.9 3.40997 7.12V14.55C3.40997 15.73 4.18997 17.28 5.13997 17.99L9.43997 21.2C10.85 22.26 13.17 22.26 14.58 21.2L18.88 17.99C19.83 17.28 20.61 15.73 20.61 14.55V7.12C20.61 5.89 19.67 4.53 18.52 4.1L13.53 2.23C12.68 1.92 11.32 1.92 10.49 2.23Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.04999 11.87L10.66 13.48L14.96 9.17999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold text-sm sm:text-base truncate">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
