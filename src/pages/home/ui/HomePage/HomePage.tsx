import { Hero } from '@/widgets/hero'
import { Ticker } from '@/widgets/ticker'
import { CategoriesHero } from '@/widgets/categories-hero'
import React from 'react'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Ticker />
      <CategoriesHero />
    </main>
  )
}

export default HomePage

