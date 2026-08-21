import React from 'react';
import { Hero } from '@/widgets/hero';
import { Ticker } from '@/widgets/ticker';
import { CategoriesHero } from '@/widgets/categories-hero';
import { DoctorsSlider } from '@/widgets/doctors-slider';
import { AboutUs } from '@/widgets/about-us';
import { Footer } from '@/widgets/footer';

const HomePage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'LayerMed',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://layermed.uz',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://layermed.uz'}/icon.svg`,
    description: 'LayerMed — умная медицинская платформа для поиска врачей и онлайн-записи на прием.',
    medicalSpecialty: [
      'Cardiovascular',
      'Pediatric',
      'Neurology',
      'Dermatology',
      'Gynecology',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998-90-123-45-67',
      contactType: 'customer service',
      areaServed: 'UZ',
      availableLanguage: ['Russian', 'Uzbek'],
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Ticker />
      <CategoriesHero />
      <DoctorsSlider />
      <AboutUs />
      <Footer />
    </main>
  );
};

export default HomePage;
