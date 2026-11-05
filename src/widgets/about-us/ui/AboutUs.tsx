import React from 'react';
import { AboutUsProps } from '../model/types';
import { AboutUsClient } from './AboutUsClient';

export function AboutUs({
  title = 'О нас',
  subtitle = 'LayerMed объединяет врачей и пациентов, чтобы сделать медицинские услуги доступнее и удобнее.',
  initialStats,
}: AboutUsProps) {
  return (
    <AboutUsClient
      title={title}
      subtitle={subtitle}
      initialStats={initialStats}
    />
  );
}
