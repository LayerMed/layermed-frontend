'use client';

import { useState, type FormEvent } from 'react';
import { Button, Input } from '@/shared/ui';
import { useAuth } from '../../model/AuthProvider';
import { getAuthErrorMessage } from '../../model/getAuthErrorMessage';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setError(null);
    setIsSubmitting(true);
    try {
      await register({
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        password: String(data.get('password') ?? ''),
      });
      form.reset();
      onSuccess();
    } catch (cause) {
      setError(getAuthErrorMessage(cause));
    } finally {
      setIsSubmitting(false);
    }
  }

  return <form onSubmit={handleSubmit} className="space-y-4">
    <label className="block text-sm font-semibold text-foreground">
      Имя
      <Input name="name" type="text" autoComplete="name" required minLength={2} placeholder="Ваше имя" wrapperClassName="mt-1 bg-background" />
    </label>
    <label className="block text-sm font-semibold text-foreground">
      Электронная почта
      <Input name="email" type="email" autoComplete="email" required placeholder="name@example.com" wrapperClassName="mt-1 bg-background" />
    </label>
    <label className="block text-sm font-semibold text-foreground">
      Пароль
      <Input name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} placeholder="Не менее 8 символов" wrapperClassName="mt-1 bg-background" />
    </label>
    {error && <p role="alert" className="rounded-lg bg-error/10 p-3 text-sm text-error">{error}</p>}
    <Button type="submit" variant="accent" disabled={isSubmitting} className="w-full">
      {isSubmitting ? 'Регистрируем…' : 'Зарегистрироваться'}
    </Button>
    <p className="text-center text-sm text-foreground/70">
      Уже есть аккаунт?{' '}
      <button type="button" onClick={onSwitchToLogin} className="font-semibold text-primary hover:underline">Войти</button>
    </p>
  </form>;
}
