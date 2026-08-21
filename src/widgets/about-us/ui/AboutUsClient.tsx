'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutUsClientProps {
  title: string;
  subtitle: string;
  doctorsDisplay: string;
  usersDisplay: string;
  ratingDisplay: string;
}

export function AboutUsClient({
  title,
  subtitle,
  doctorsDisplay,
  usersDisplay,
  ratingDisplay,
}: AboutUsClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          y: 50,
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
      {/* Background Parallax Icon */}
      <div
        ref={iconRef}
        className="pointer-events-none absolute top-8 left-6 opacity-15 text-[#34AAFF] z-0"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="px-3 mb-10 text-center flex flex-col items-center">
          <h2 className="font-bold text-[40px] leading-[1.1] mb-3.5 text-foreground">
            {title}
          </h2>
          <p className="max-w-[829px] text-[#95A8B4] font-medium">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4 max-w-[1200px] mx-auto pb-4">
          <div className="hidden lg:flex items-center justify-center p-6 min-h-[360px] relative overflow-hidden rounded-3xl">
            <div ref={logoRef} className="relative w-full max-w-[420px] h-[360px]">
              <Image
                src="/icon.svg"
                alt="LayerMed Logo Graphic"
                fill
                className="object-contain drop-shadow-[0_20px_35px_rgba(52,170,255,0.25)]"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:gap-9">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-6">
              <div className="flex flex-col items-center shrink-0 min-w-[120px] sm:min-w-[140px]">
                <span className="text-[42px] sm:text-[52px] font-bold leading-none text-[#34AAFF]">
                  {doctorsDisplay}
                </span>
                <div className="w-full h-[2px] mt-2 sm:mt-3 bg-gradient-to-r from-transparent via-[#34AAFF]/30 to-transparent" />
              </div>
              <div className="pt-1">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-foreground mb-1 sm:mb-1.5 leading-snug">
                  Квалифицированных врачей
                </h3>
                <p className="text-sm sm:text-[15px] text-[#95A8B4] font-medium leading-relaxed">
                  Опытные медицинские специалисты, обладающие высокой квалификацией и знаниями в своей области.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-6">
              <div className="flex flex-col items-center shrink-0 min-w-[120px] sm:min-w-[140px]">
                <span className="text-[42px] sm:text-[52px] font-bold leading-none text-[#34AAFF]">
                  {usersDisplay}
                </span>
                <div className="w-full h-[2px] mt-2 sm:mt-3 bg-gradient-to-r from-transparent via-[#34AAFF]/30 to-transparent" />
              </div>
              <div className="pt-1">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-foreground mb-1 sm:mb-1.5 leading-snug">
                  Пользователей по всей Центральной Азии
                </h3>
                <p className="text-sm sm:text-[15px] text-[#95A8B4] font-medium leading-relaxed">
                  Свыше пяти тысяч довольных и постоянных пользователей по всей Центральной Азии.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-6">
              <div className="flex flex-col items-center shrink-0 min-w-[120px] sm:min-w-[140px]">
                <span className="text-[42px] sm:text-[52px] font-bold leading-none text-[#34AAFF]">
                  {ratingDisplay}
                </span>
                <div className="w-full h-[2px] mt-2 sm:mt-3 bg-gradient-to-r from-transparent via-[#34AAFF]/30 to-transparent" />
              </div>
              <div className="pt-1">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-foreground mb-1 sm:mb-1.5 leading-snug">
                  Средний рейтинг оставляемый пользователями
                </h3>
                <p className="text-sm sm:text-[15px] text-[#95A8B4] font-medium leading-relaxed">
                  Средняя оценка всех наших постоянных пользователей
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
