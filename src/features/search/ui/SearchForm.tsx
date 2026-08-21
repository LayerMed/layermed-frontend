'use client';

import { useState } from 'react';
import { Button, Input } from '@/shared/ui';

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', { searchQuery });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 bg-background w-full max-w-[658px] rounded-2xl sm:rounded-3xl"
    >
      <Input
        type="text"
        placeholder="Введите симптомы (например: головная боль, кашель...)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />

      <Button
        type="submit"
        variant="accent"
        className="w-full sm:w-auto shrink-0 justify-center min-w-[140px] md:min-w-[180px]"
      >
        Поиск
      </Button>
    </form>
  );
};
