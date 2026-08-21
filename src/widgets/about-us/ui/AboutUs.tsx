import React from 'react';
import { getAboutStats } from '../api/getAboutStats';
import { AboutUsProps } from '../model/types';
import { AboutUsClient } from './AboutUsClient';

export async function AboutUs({
  title = 'О нас',
  subtitle = 'LayerMed-компания которая объединяет сотни врачей с нашими пользователями, чтобы сделать медицинские услуги более доступными и удобными!',
  initialStats,
}: AboutUsProps) {
  const stats = initialStats || (await getAboutStats());

  const doctorsDisplay = stats.doctorsCount ? `${stats.doctorsCount}` : '400';
  const usersDisplay = stats.usersCount ? `+${Math.floor(stats.usersCount / 1000)}K` : '+5K';
  const ratingDisplay = stats.averageRating ? stats.averageRating.toFixed(1) : '4.8';

  return (
    <AboutUsClient
      title={title}
      subtitle={subtitle}
      doctorsDisplay={doctorsDisplay}
      usersDisplay={usersDisplay}
      ratingDisplay={ratingDisplay}
    />
  );
}
