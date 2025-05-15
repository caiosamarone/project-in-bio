import NextAuth from 'next-auth'
import { FirestoreAdapter } from '@auth/firebase-adapter'
import { firebaseCerticate } from './firebase'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter({
    credential: firebaseCerticate,
  }),
  providers: [Google],
  events: {},
  callbacks: {},
})
