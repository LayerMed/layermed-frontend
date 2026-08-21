'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (icon1Ref.current) {
        gsap.to(icon1Ref.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }
      if (icon2Ref.current) {
        gsap.to(icon2Ref.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative overflow-hidden bg-gradient-to-r from-[#38B6FF] via-[#34AAFF] to-[#217EE8] text-white rounded-[45px] my-6 p-8 md:p-12 pb-6 md:pb-10 flex flex-col justify-between">
      {/* Background Parallax Icons */}
      <div
        ref={icon1Ref}
        className="pointer-events-none absolute top-6 left-8 opacity-20 text-white z-0"
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
        </svg>
      </div>

      <div
        ref={icon2Ref}
        className="pointer-events-none absolute bottom-8 right-12 opacity-20 text-white z-0"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 12.5l7-7a4.95 4.95 0 017 7l-7 7a4.95 4.95 0 01-7-7z" />
          <path d="M8.5 8.5l7 7" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-8 text-center lg:text-left">
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <span className="font-semibold text-lg text-white/90 mb-2">
              Связь с нами
            </span>
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-[44px] md:text-[52px] font-bold text-white tracking-tight leading-none border-b-2 border-white/70 pb-1">
                LayerMed
              </h2>
            </Link>
            <p className="max-w-[380px] text-sm md:text-[15px] font-medium text-white/80 leading-relaxed">
              LayerMed-компания которая объединяет сотни врачей с нашими пользователями, чтобы сделать медицинские услуги более доступными и удобными!
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="font-bold text-lg md:text-xl text-white mb-4">
                Пациентам
              </h3>
              <ul className="space-y-2.5 text-sm md:text-[15px] font-medium text-white/80">
                <li>
                  <Link href="/doctors" className="hover:text-white transition-colors">
                    Поиск врачей
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Медицинские направления
                  </Link>
                </li>
                <li>
                  <Link href="/clinics" className="hover:text-white transition-colors">
                    Клиники
                  </Link>
                </li>
                <li>
                  <Link href="/online-consultations" className="hover:text-white transition-colors">
                    Онлайн-консультации
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-white transition-colors">
                    Отзывы
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <h3 className="font-bold text-lg md:text-xl text-white mb-4">
                Врачам и Клиникам
              </h3>
              <ul className="space-y-2.5 text-sm md:text-[15px] font-medium text-white/80">
                <li>
                  <Link href="/partner" className="hover:text-white transition-colors">
                    Стать партнером
                  </Link>
                </li>
                <li>
                  <Link href="/integration" className="hover:text-white transition-colors">
                    Подключение к платформе
                </Link>
                </li>
                <li>
                  <Link href="/rules" className="hover:text-white transition-colors">
                    Правила размещения
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <h3 className="font-bold text-lg md:text-xl text-white mb-4">
                Контакты и Поддержка
              </h3>
              <ul className="space-y-2.5 text-sm md:text-[15px] font-medium text-white/80">
                <li>
                  <a href="tel:+998901234567" className="hover:text-white transition-colors block">
                    +998 (90) 123 45 67
                  </a>
                </li>
                <li>
                  <a href="mailto:support@layermed.com" className="hover:text-white transition-colors block">
                    support@layermed.com <span className="block text-xs text-white/70 mt-0.5">(Пн-Вс: 08:00 – 20:00)</span>
                  </a>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Правила размещения
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 md:pt-16 pb-2 text-center flex justify-center border-t border-white/10 mt-4">
          <span className="text-xs md:text-sm font-medium text-white/80">
            © 2026 LAYERMED. Все права защищены
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
