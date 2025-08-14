import Header from '@/app/components/landing-page/header'

import PlanButtons from './plan-buttons'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ProjectInBio - Upgrade',
  description: 'ProjectInBio - A plataforma para criar sua página de links',
}

export default function UpgradePage() {
  return (
    <div className=' h-screen flex flex-col items-center justify-center gap-4'>
      <Header />
      <h2 className='text-2xl font-bold'> Escolha o plano</h2>
      <PlanButtons />
    </div>
  )
}
