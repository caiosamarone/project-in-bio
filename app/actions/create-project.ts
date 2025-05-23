'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { auth } from '../lib/auth'
import { db } from '../lib/firebase'
import { randomUUID } from 'crypto'
import { v2 as cloudinary } from 'cloudinary'

export async function createProject(formData: FormData) {
  const session = await auth()
  if (!session) return

  const profileId = formData.get('profileId') as string
  const projectName = formData.get('projectName') as string
  const projectDescription = formData.get('projectDescription') as string
  const projectUrl = formData.get('projectUrl') as string
  const file = formData.get('file') as File

  const generatedId = randomUUID()

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64 = buffer.toString('base64')
  const dataUri = `data:image/png;base64,${base64}`

  cloudinary.config({
    cloud_name: 'derq27tar',
    api_key: '371614867556781',
    api_secret: 'Sphj0jY1KQ8S6mn6FZHnuv7cxQM',
  })

  let imagePath = ''
  await cloudinary.uploader
    .upload(dataUri)
    .then((value) => (imagePath = value.public_id))
    .catch((error) => {
      console.log(error, 'error')
    })
  if (!imagePath) {
    return false
  }
  try {
    await db
      .collection('projects')
      .doc(profileId)
      .collection('projects')
      .doc()
      .set({
        userId: session.user?.id,
        projectName,
        projectDescription,
        projectUrl,
        imagePath,
        createdAt: Timestamp.now().toMillis(),
      })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
