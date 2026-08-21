'use client';

import { Button } from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const headerLinks = [
    { text: 'Каталог', linkto: '/categories' },
    { text: 'Список врачей', linkto: '/doctors' },
    { text: 'О нас', linkto: '#about' },
    { text: 'Контакты', linkto: '#contacts' },
    { text: 'Услуги', linkto: '#services' },
  ];

  const handleOpen = () => {
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    if (drawerRef.current && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => setIsMenuOpen(false),
      });
    } else {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (drawerRef.current && overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        gsap.fromTo(
          drawerRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.4, ease: 'power3.out' }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="relative flex items-center justify-between py-2">
      <Link href="/" className="shrink-0">
        <Image
          src="/LogoBig.svg"
          width={210}
          height={36}
          alt="Layermed"
          priority
          className="w-[160px] md:w-[210px] h-auto"
        />
      </Link>

      <nav className="hidden lg:flex items-center justify-between">
        <ul className="flex items-center justify-center gap-x-2">
          {headerLinks.map((item, idx) => (
            <li key={idx}>
              <Link
                className="px-5 py-[13.5px] bg-background rounded-2xl font-semibold hover:bg-[#D3DDE4] duration-300 ease block"
                href={item.linkto}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden lg:flex items-center justify-center gap-x-2">
        <Button>Войти</Button>
        <Button variant="accent">Зарегестрироваться</Button>
      </div>

      <button
        onClick={() => (isMenuOpen ? handleClose() : handleOpen())}
        className="lg:hidden p-3 rounded-2xl bg-background hover:bg-[#D3DDE4] transition-colors z-50 text-foreground flex items-center justify-center relative"
        aria-label="Toggle Navigation Menu"
      >
        {isMenuOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        )}
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/40 backdrop-blur-md opacity-0"
            onClick={handleClose}
          />

          <div
            ref={drawerRef}
            className="fixed top-0 right-0 h-full w-[80vw] sm:w-[50vw] max-w-[400px] bg-white shadow-2xl p-6 pt-24 flex flex-col justify-between z-40 overflow-y-auto translate-x-full"
          >
            <div className="flex flex-col gap-y-3">
              {headerLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.linkto}
                  onClick={handleClose}
                  className="w-full px-5 py-3.5 bg-background rounded-2xl text-base font-bold text-foreground hover:bg-[#D3DDE4] transition-colors"
                >
                  {item.text}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-black/5 flex flex-col gap-3 mt-auto">
              <Button className="w-full justify-center py-3.5 text-sm font-semibold">
                Войти
              </Button>
              <Button variant="accent" className="w-full justify-center py-3.5 text-sm font-semibold">
                Зарегестрироваться
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
