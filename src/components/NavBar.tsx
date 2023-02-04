import { useState, type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../lib/firebase'
import { useUser } from '../lib/user'

export default function NavBar (): JSX.Element {
  const { user } = useUser()

  const baseLinks = [
    { to: '/', title: 'Home' },
    { to: '/tasks', title: 'Tasks' }
  ]
  const authLinks = user != null
    ? [
        { to: `/${user.type}/${user.id}`, title: 'Profile' },
        { to: '/sign-out', title: 'Sign Out' }
      ]
    : [
        { to: '/sign-in', title: 'Sign In' },
        { to: '/create-account', title: 'Create Account' }
      ]

  return (
    <nav className="flex justify-between items-center bg-blue-900">
      <div className="pl-2 text-slate-300 hover:text-slate-50">
        <Link to="/">Logo</Link>
      </div>

      <ul className="flex">
        {[...baseLinks, ...authLinks].map(({ to, title }) => (
          <li key={to} className="p-2 text-slate-300 hover:text-slate-100 transition ease-in-out delay-50 duration-200">
            <Link to={to} className="btn btn-link">{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
