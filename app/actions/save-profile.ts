'use server'

import { randomUUID } from 'crypto'
import { db } from '../lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'
import { auth } from '../lib/auth'
import { v2 as cloudinary } from 'cloudinary'

export async function saveProfile(formData: FormData) {
  const session = await auth()
  if (!session) return

  try {
    const profileId = formData.get('profileId') as string
    const yourName = formData.get('yourName') as string
    const yourDescription = formData.get('yourDescription') as string
    const file = formData.get('profilePic') as File

    let imagePath = ''
    const hasFile = file && file.size > 0

    if (hasFile) {
      // Remove old image from Cloudinary if needed (optional, see below)
      const currentProfile = await db
        .collection('profiles')
        .doc(profileId)
        .get()
      const currentImagePath = currentProfile.data()?.imagePath

      if (currentImagePath) {
        try {
          await cloudinary.uploader.destroy(currentImagePath)
        } catch (e) {
          // Ignore if not found or error
        }
      }

      // Upload new image to Cloudinary
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64 = buffer.toString('base64')
      const dataUri = `data:image/png;base64,${base64}`

      cloudinary.config() // Uses env vars

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: `profiles-images/${profileId}`,
        public_id: randomUUID(),
        overwrite: true,
      })
      imagePath = uploadResult.public_id
    }

    await db
      .collection('profiles')
      .doc(profileId)
      .update({
        name: yourName,
        description: yourDescription,
        ...(hasFile && { imagePath }),
        updatedAt: Timestamp.now().toMillis(),
      })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
