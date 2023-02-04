import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useState, type FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../lib/firebase'

export default function CreateAccountPage (): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState<'' | 'student' | 'employer'>('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const userInfo = {
          id: user.uid,
          email: user.email,
          type
        }
        await setDoc(doc(db, 'users', user.uid), userInfo)
        return userInfo
      })
      .then(() => { navigate('/') })
      .catch(error => {
        console.error('An error occurred while creating an account: ', error)
        setErrorMessage(error.message)
      })
  }

  return (
    <div className="max-w-prose mx-auto">
      <h1 className="text-3xl font-semibold mt-5 mb-3">Create an Account</h1>
      {errorMessage !== '' && <p className="bg-red-700 text-white rounded p-5 mb-3">{errorMessage}</p>}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            className="
              mt-1
              block
              w-full
              rounded-md
              border-gray-300
              shadow-sm
              focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50
            "
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            className="
              mt-1
              block
              w-full
              rounded-md
              border-gray-300
              shadow-sm
              focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50
            "
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Are you a student or an employer?</span>
          <select
            name="type"
            value={type}
            onChange={(e) => { setType(e.target.value as 'student' | 'employer') }}
            className="
              block
              w-full
              mt-1
              rounded-md
              border-gray-300
              shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            required
          >
            <option value="">Choose an option</option>
            <option value="student">Student</option>
            <option value="employer">Employer</option>
          </select>
        </label>
        <button className="block mt-2 px-3 py-2 text-white bg-sky-500 border-sky-300 rounded-md focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50">Create Account</button>
      </form>
    </div>
  )
}
