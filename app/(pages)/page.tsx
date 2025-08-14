import { Metadata } from 'next'
import FAQ from '../components/landing-page/faq'
import Header from '../components/landing-page/header'
import Hero from '../components/landing-page/hero'
import Pricing from '../components/landing-page/pricing'
import VideoExplanation from '../components/landing-page/video-explanation'
import { trackServerEvent } from '../lib/mixpanel'

export const metadata: Metadata = {
  title: 'ProjectInBio',
  description: 'ProjectInBio - A plataforma para criar sua página de links',
}

export default function Home() {
  trackServerEvent('page_view', {
    page: 'home',
  })

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <Hero />

      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  )
}
