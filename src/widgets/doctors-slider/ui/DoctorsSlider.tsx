'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'swiper/css';

import { Button } from '@/shared/ui';
import { Doctor } from '../model/types';
import { MOCK_DOCTORS } from '../api/getDoctors';
import { DoctorCard } from './DoctorCard';

gsap.registerPlugin(ScrollTrigger);

interface DoctorsSliderProps {
  doctors?: Doctor[];
  title?: string;
  subtitle?: string;
}

export function DoctorsSlider({
  doctors = MOCK_DOCTORS,
  title = 'Наши лучшие специалисты',
  subtitle = 'Выберите подходящего врача и запишитесь на приём онлайн в пару кликов.',
}: DoctorsSliderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (icon1Ref.current) {
        gsap.to(icon1Ref.current, {
          y: 60,
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
          y: -50,
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
      {/* Background parallax icons */}
      <div
        ref={icon1Ref}
        className="pointer-events-none absolute top-12 left-6 opacity-15 text-primary z-0"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
        </svg>
      </div>

      <div
        ref={icon2Ref}
        className="pointer-events-none absolute bottom-12 right-6 opacity-20 text-emerald-400 z-0"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="px-3 mb-8 text-center flex flex-col items-center">
          <h2 className="font-bold text-[40px] leading-[1.1] mb-3.5 text-foreground">
            {title}
          </h2>
          <p className="max-w-[829px] text-[#95A8B4] font-medium">
            {subtitle}
          </p>
        </div>

        <div className="relative py-4" suppressHydrationWarning>
          {isMounted ? (
            <Swiper
              modules={[Keyboard]}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              spaceBetween={24}
              speed={800}
              grabCursor={true}
              slideToClickedSlide={true}
              keyboard={{
                enabled: true,
                onlyInViewport: true,
              }}
              autoplay={false}
              navigation={false}
              pagination={false}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1.8,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2.2,
                  spaceBetween: 28,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 36,
                },
              }}
              className="!pt-8 !pb-6 [&_.swiper-slide]:transition-all [&_.swiper-slide]:duration-700 [&_.swiper-slide]:ease-[cubic-bezier(0.25,1,0.3,1)]"
            >
              {doctors.map((doctor) => (
                <SwiperSlide key={doctor.id} className="h-auto">
                  {({ isActive }) => (
                    <DoctorCard doctor={doctor} isActive={isActive} />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex overflow-hidden gap-4 px-3 py-4">
              {doctors.slice(0, 3).map((doctor, index) => (
                <div key={doctor.id} className="w-full max-w-[600px] shrink-0">
                  <DoctorCard doctor={doctor} isActive={index === 0} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/doctors">
            <Button variant="accent" hasImage>
              Показать всех врачей
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
