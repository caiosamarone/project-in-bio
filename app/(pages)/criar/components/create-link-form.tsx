'use client'

import { createProfile } from '@/app/actions/create-profile'
import { verifyProfile } from '@/app/actions/verify-profile'
import Button from '@/app/components/ui/button'
import TextInput from '@/app/components/ui/text-input'
import { sanitizeLink } from '@/app/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

import { ChangeEvent, FormEvent, useState } from 'react'

export default function CreateLinkForm() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const [error, setError] = useState('')
  const [link, setLink] = useState(sanitizeLink(searchParams.get('link') || ''))

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value))
    setError('')
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!link) return setError('Escolha um link válido')

    const isLinkTaken = await verifyProfile(link)
    if (isLinkTaken) return setError('Esse link já está em uso, tente outro.')

    const success = await createProfile(link)
    if (!success) return setError('Erro ao criar perfil. Tente novamente')

    router.push(`/${link}`)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-full flex items-center gap-2'>
        <span className='text-white'>projectinbio.com</span>
        <TextInput onChange={handleLinkChange} value={link} />
        <Button className='w-[156px]'>Criar</Button>
      </form>
      <div>
        <span className='text-accent-pink'>{error && error}</span>
      </div>
    </>
  )
}
