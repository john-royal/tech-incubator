import { getAuth, type User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import app from './firebase'

const auth = getAuth(app)

export default function useAuth (): { user: User | null, signOut: () => Promise<void> } {
  const [user, setUser] = useState<User | null>(auth.currentUser)

  useEffect(() => {
    auth.onAuthStateChanged(user => { setUser(user) })
  })

  return {
    user,
    signOut: async () => { await auth.signOut() }
  }
}
