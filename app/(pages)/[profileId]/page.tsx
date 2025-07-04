import ProjectCard from '@/app/components/common/project-card'
import TotalVisits from '@/app/components/common/total-visits'
import UserCard from '@/app/components/common/user-card/user-card'
import { auth } from '@/app/lib/auth'
import {
  getProfileData,
  getProfileProjects,
} from '@/app/server/get-profile-data'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import NewProject from './components/new-project'
import { increaseProfileVisits } from '@/app/actions/increase-profile-visits'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>
}) {
  const { profileId } = await params

  const profileData = await getProfileData(profileId)

  if (!profileData) return notFound()

  const session = await auth()

  const projects = await getProfileProjects(profileId)

  const isOwner = profileData.userId === session?.user?.id

  if (!isOwner) {
    await increaseProfileVisits(profileId)
  }

  return (
    <div className='relative h-screen flex p-20 overflow-hidden'>
      <div className='fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary'>
        <span>Você está usando a versão trial</span>
        <Link href={`${profileId}/upgrade`}>
          <button className='text-accent-green font-bold cursor-pointer'>
            Faça o upgrade agora
          </button>
        </Link>
      </div>
      <div className='w-1/2 flex justify-center h-min'>
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>
      <div className='w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto'>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={`https://res.cloudinary.com/derq27tar/image/upload/v1747514883/${project.imagePath}`}
          />
        ))}
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      {isOwner && (
        <div className='absolute bottom-4 right-0 left-0 w-min mx-auto'>
          <TotalVisits totalVisits={profileData.totalVisits} />
        </div>
      )}
    </div>
  )
}
