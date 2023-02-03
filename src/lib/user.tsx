import { doc, onSnapshot } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState, type PropsWithChildren, type SetStateAction } from 'react'
import { auth, db } from './firebase'
import { type EmployerUser, type StudentUser, type UserState } from './types'

const UserContext = createContext<UserState>({ user: null, status: 'unauthenticated' })

export function useUser (): UserState {
  return useContext(UserContext)
}

export function UserProvider ({ children }: PropsWithChildren): JSX.Element {
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

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
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
