import { doc, onSnapshot } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState, type PropsWithChildren, type SetStateAction } from 'react'
import { auth, db } from './firebase'
import { type User, type UserState } from './types'

const UserContext = createContext<UserState>({ user: null })

export function useUser (): UserState {
  return useContext(UserContext)
}

export function UserProvider ({ children }: PropsWithChildren): JSX.Element {
  const [user, setUser] = useCachedState('user', auth.currentUser)
  const [state, setState] = useCachedState<UserState>('state', { user: null })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { setUser(user) })
    return () => { unsubscribe() }
  })

  useEffect(() => {
    if (user != null) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), doc => {
        setState({
          user: doc.data() as User
        })
      })
      return () => { unsubscribe() }
    } else {
      setState({ user: null })
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
