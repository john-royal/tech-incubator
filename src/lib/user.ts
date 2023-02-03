import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { type SetStateAction, useEffect, useState } from 'react'
import app from './firebase'
import { type EmployerUser, type StudentUser, type User } from './types'

interface UnauthenticatedUserState {
  user: null
  status: 'unauthenticated'
}

interface OnboardingUserState {
  user: User
  status: 'onboarding'
}

interface AuthenticatedUserState {
  user: EmployerUser | StudentUser
  status: 'authenticated'
}

type UserState = UnauthenticatedUserState | OnboardingUserState | AuthenticatedUserState

const auth = getAuth(app)
const db = getFirestore(app)

export function useUser (): UserState {
  const [user, setUser] = useCachedState('user', auth.currentUser)
  const [state, setState] = useCachedState<UserState>('state', { user: null, status: 'unauthenticated' })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { setUser(user) })
    return () => { unsubscribe() }
  })

  useEffect(() => {
    if (user != null) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), doc => {
        if (doc.exists()) {
          setState({
            user: doc.data() as EmployerUser | StudentUser,
            status: 'authenticated'
          })
        } else {
          setState({
            user: { id: user.uid, email: user.email as string },
            status: 'onboarding'
          })
        }
      })
      return () => { unsubscribe() }
    } else {
      setState({ user: null, status: 'unauthenticated' })
    }
  }, [user])

  return state
}

export async function signIn (email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password)
}

export async function signOut (): Promise<void> {
  await auth.signOut()
}

export async function createAccount (email: string, password: string): Promise<void> {
  await createUserWithEmailAndPassword(auth, email, password)
}

function useCachedState<T> (key: string, defaultValue: T): [T, React.Dispatch<SetStateAction<T>>] {
  const initialValue = (() => {
    const data = localStorage.getItem(key)
    if (data != null) return JSON.parse(data) as T
    else return defaultValue
  })()
  const [state, setState] = useState<T>(initialValue)
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])
  return [state, setState]
}
