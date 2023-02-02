import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, type User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import app from './firebase'

interface Auth {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  createAccount: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const auth = getAuth(app)

export default function useAuth (): Auth {
  const [user, setUser] = useState<User | null>(auth.currentUser)

  useEffect(() => {
    auth.onAuthStateChanged(user => { setUser(user) })
  })

  return {
    user,
    async signIn (email, password) {
      await signInWithEmailAndPassword(auth, email, password)
    },
    async createAccount (email, password) {
      await createUserWithEmailAndPassword(auth, email, password)
    },
    async signOut () {
      await auth.signOut()
    }
  }
}
