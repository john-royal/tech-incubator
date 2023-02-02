import { useState, type FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../lib/useAuth'

export default function CreateAccountPage (): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { createAccount } = useAuth()
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()

    createAccount(email, password)
      .then(() => { navigate('/') })
      .catch(error => { alert(error.message) })
  }

  return <form onSubmit={handleSubmit}>
    <input name="email" value={email} onChange={e => { setEmail(e.target.value) }} />
    <input name="password" value={password} onChange={e => { setPassword(e.target.value) }} />
    <button>Create Account</button>
  </form>
}
