'use client'

import PublicBasePage from '@/ui/template/PublicBasePage'

import { HeroSection } from './sections/00_hero'
import { MarketGapSection } from './sections/01_market-gap'
import { SolutionSection } from './sections/02_solution'
import { FutureSection } from './sections/03_future'
import { CatchSection } from './sections/04_catch'
import { HowToSection } from './sections/05_how-to'

const PublicHomeView = () => {
  return (
    <PublicBasePage>
      <HeroSection />
      <MarketGapSection />
      <SolutionSection />
      <FutureSection />
      <CatchSection />
      <HowToSection />
    </PublicBasePage>
  )
}

export default PublicHomeView
