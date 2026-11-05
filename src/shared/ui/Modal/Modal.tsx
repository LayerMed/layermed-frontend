'use client';

import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const subscribe = () => () => {};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open || !isClient) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    const firstFocusable = dialog?.querySelector<HTMLElement>(focusableSelector);
    (firstFocusable ?? dialog)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, isClient]);

  if (!open || !isClient) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm motion-safe:animate-[modal-backdrop-enter_200ms_ease-out]"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="max-h-[min(90vh,800px)] w-full max-w-lg overflow-y-auto rounded-3xl bg-surface p-6 shadow-card outline-none motion-safe:animate-[modal-content-enter_200ms_ease-out]"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-bold text-foreground">{title}</h2>
          <Button type="button" aria-label="Закрыть" onClick={onClose} className="shrink-0 !px-3 !py-2">
            <span aria-hidden="true">×</span>
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
