import { useState, type FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../lib/useAuth'

export default function SignInPage (): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()

    signIn(email, password)
      .then(() => { navigate('/') })
      .catch(error => { alert(error.message) })
  }

  return <form onSubmit={handleSubmit}>
    <input name="email" value={email} onChange={e => { setEmail(e.target.value) }} />
    <input name="password" value={password} onChange={e => { setPassword(e.target.value) }} />
    <button>Sign In</button>
  </form>
}
