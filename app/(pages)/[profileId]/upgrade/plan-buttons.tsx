'use client'

import Button from '@/app/components/ui/button'
import { useStripe } from '@/app/hooks/useStripe'
import { useParams } from 'next/navigation'

export default function PlanButtons() {
  const { createStripeCheckout } = useStripe()
  const { profileId } = useParams()

  function handleSubscribe(isSubscription = false) {
    createStripeCheckout({
      isSubscription,
      metadata: {
        profileId,
      },
    })
  }
  return (
    <div className='flex gap-4'>
      <Button onClick={() => handleSubscribe(true)}>R$ 9,90 mês</Button>
      <Button onClick={() => handleSubscribe()}>R$ 99,90 vitalício</Button>
    </div>
  )
}
