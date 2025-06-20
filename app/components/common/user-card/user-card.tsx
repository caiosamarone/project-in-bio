import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Button from '../../ui/button'

import EditSocialLinks from './edit-social-links'
import Link from 'next/link'
import { ProfileData } from '@/app/server/get-profile-data'
import AddCustomLink from './add-custom-link'

const icons = [Github, Instagram, Linkedin, Twitter]

export default function UserCard({
  profileData,
}: {
  profileData?: ProfileData
}) {
  return (
    <div className='w-[348px] flex flex-col gap-5 items-center p-5  border-white border-opacity-10 bg-[#121212] rounded-3xl text-white'>
      <div className='size-48'>
        <img
          src='/me.png'
          alt='Caio dev'
          className='rounded-full object-cover w-full h-full'
        />
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex items-center gap-2'>
          <h3 className='text-3xl font-bold min-w-0 overflow-hidden'>
            Caio Mendes
          </h3>
        </div>
        <p className='opacity-40'>"Eu faço produtos para internet"</p>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <span className='uppercase text-xs font-medium'>Links</span>
        <div className='flex gap-3 justify-center'>
          {profileData?.socialMedias.github && (
            <Link
              href={profileData?.socialMedias.github}
              target='_blank'
              className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'
            >
              <Github />
            </Link>
          )}
          {profileData?.socialMedias.instagram && (
            <Link
              href={profileData?.socialMedias.instagram}
              target='_blank'
              className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'
            >
              <Instagram />
            </Link>
          )}
          {profileData?.socialMedias.linkedin && (
            <Link
              href={profileData?.socialMedias.linkedin}
              target='_blank'
              className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'
            >
              <Linkedin />
            </Link>
          )}
          {profileData?.socialMedias.twitter && (
            <Link
              href={profileData?.socialMedias.twitter}
              target='_blank'
              className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'
            >
              <Twitter />
            </Link>
          )}

          <EditSocialLinks socialMedias={profileData?.socialMedias} />
        </div>
      </div>
      <div className='flex flex-col gap-3 w-full h-[172px]'>
        <div className='w-full flex flex-col items-center gap-3'>
          {profileData?.link1 && (
            <Link
              href={profileData.link1.url}
              target='blank'
              className='w-full'
            >
              <Button className='w-full'> {profileData.link1.title}</Button>
            </Link>
          )}
          {profileData?.link2 && (
            <Link
              href={profileData.link2.url}
              target='blank'
              className='w-full'
            >
              <Button className='w-full'> {profileData.link2.title}</Button>
            </Link>
          )}
          {profileData?.link3 && (
            <Link
              href={profileData.link3.url}
              target='blank'
              className='w-full'
            >
              <Button className='w-full'> {profileData.link3.title}</Button>
            </Link>
          )}
        </div>
      </div>
      <AddCustomLink />
    </div>
  )
}
