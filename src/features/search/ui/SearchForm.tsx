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
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-1.5 bg-background w-[658px] rounded-3xl">
      <Input
        type="text"
        placeholder="Введите симптомы (например: головная боль, кашель...)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='w-[430px]'
      />

      <Button type="submit" variant="accent" className='p-0 w-[350px]!'>
        Поиск
      </Button>
    </form>
  );
};



