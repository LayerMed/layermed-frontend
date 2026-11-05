'use client';

import { Button, Modal } from '@/shared/ui';
import { LoginForm, RegisterForm, getAuthErrorMessage, useAuth } from '@/features/auth';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const auth = useAuth();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const headerLinks = [
    { text: 'Каталог', linkto: '/categories' },
    { text: 'Список врачей', linkto: '/doctors' },
    { text: 'О нас', linkto: '/#about' },
    { text: 'Контакты', linkto: '/#contacts' },
    { text: 'Услуги', linkto: '/#booking-offers' },
  ];

  const handleClose = () => setIsMenuOpen(false);

  const openAuth = (mode: 'login' | 'register') => {
    setLogoutError(null);
    setIsMenuOpen(false);
    setAuthMode(mode);
  };

  const handleLogout = async () => {
    setLogoutError(null);
    try {
      await auth.logout();
      setIsMenuOpen(false);
    } catch (error) {
      setLogoutError(getAuthErrorMessage(error));
    }
  };

  const authActions = (mobile = false) => {
    const buttonClass = mobile ? 'w-full justify-center py-3.5 text-sm font-semibold' : '';
    if (auth.isRestoring) return <span role="status" className="text-sm text-foreground/70">Восстанавливаем сессию…</span>;
    if (auth.isUserLoading) return <span role="status" className="text-sm text-foreground/70">Загружаем профиль…</span>;
    if (auth.isUserError) return <>
      <Button type="button" onClick={auth.retryUser} className={buttonClass}>Повторить загрузку профиля</Button>
      <Button type="button" onClick={() => void handleLogout()} disabled={auth.isLoggingOut} className={buttonClass}>Выйти</Button>
    </>;
    if (auth.user) return <>
      <span className="max-w-40 truncate font-semibold text-foreground" title={auth.user.name}>{auth.user.name}</span>
      <Button type="button" onClick={() => void handleLogout()} disabled={auth.isLoggingOut} className={buttonClass}>
        {auth.isLoggingOut ? 'Выходим…' : 'Выйти'}
      </Button>
    </>;
    return <>
      <Button type="button" onClick={() => openAuth('login')} className={buttonClass}>Войти</Button>
      <Button type="button" onClick={() => openAuth('register')} variant="accent" className={buttonClass}>Зарегистрироваться</Button>
    </>;
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMenuOpen(false);
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>('a, button:not([disabled])'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
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
        <Link href="#doctor-search" aria-label="Перейти к поиску" className="rounded-2xl bg-background p-3 text-foreground hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </svg>
        </Link>
        {authActions()}
      </div>

      <button
        ref={menuButtonRef}
        onClick={() => setIsMenuOpen((open) => !open)}
        className="lg:hidden p-3 rounded-2xl bg-background hover:bg-[#D3DDE4] transition-colors z-50 text-foreground flex items-center justify-center relative"
        aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
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
            className="fixed inset-0 bg-black/40 backdrop-blur-md motion-safe:animate-[modal-backdrop-enter_200ms_ease-out]"
            onClick={handleClose}
          />

          <div
            id="mobile-navigation"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Навигация"
            className="fixed top-0 right-0 h-full w-[80vw] sm:w-[50vw] max-w-[400px] bg-surface shadow-card p-6 pt-24 flex flex-col justify-between z-40 overflow-y-auto motion-safe:animate-[modal-content-enter_200ms_ease-out]"
          >
            <div className="flex flex-col gap-y-3">
              <Link href="#doctor-search" onClick={() => setIsMenuOpen(false)} className="w-full px-5 py-3.5 bg-background rounded-2xl text-base font-bold text-foreground hover:bg-primary/10 transition-colors">
                Поиск направления
              </Link>
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
              {authActions(true)}
            </div>
          </div>
        </div>
      )}

      {logoutError && <p role="alert" className="absolute right-0 top-full z-30 rounded-lg bg-error/10 p-3 text-sm text-error">{logoutError}</p>}

      <Modal open={authMode !== null} onClose={() => setAuthMode(null)} title={authMode === 'register' ? 'Регистрация' : 'Вход'}>
        {authMode === 'register' ? (
          <RegisterForm onSuccess={() => setAuthMode(null)} onSwitchToLogin={() => setAuthMode('login')} />
        ) : authMode === 'login' ? (
          <LoginForm onSuccess={() => setAuthMode(null)} onSwitchToRegister={() => setAuthMode('register')} />
        ) : null}
      </Modal>
    </header>
  );
};

export default Header;
