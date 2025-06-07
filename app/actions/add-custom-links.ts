'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { db } from '../lib/firebase'
import { auth } from '../lib/auth'

export type Link = {
  title: string
  url: string
}

export async function addCustomLinks({
  link1,
  link2,
  link3,
  profileId,
}: {
  link1: Link
  link2: Link
  link3: Link
  profileId: string
}) {
  const session = await auth()

  if (!session?.user) return

  try {
    await db.collection('profiles').doc(profileId).update({
      link1,
      link2,
      link3,
    })
    return true
  } catch (error) {
    return false
  }
}
