import { Link } from 'react-router-dom'
import { auth } from '../lib/firebase'
import { useUser } from '../lib/user'

export default function NavBar (): JSX.Element {
  const { status } = useUser()

  const navLinks = [
    { to: '/', title: 'Home' },
    { to: '/tasks', title: 'Tasks' },
    { to: '/profile', title: 'Profile' }
  ]

  return (
    <nav className="flex justify-between items-center bg-blue-900">
      <div className="pl-2 text-slate-300 hover:text-slate-50">
        <Link to="/">Logo</Link>
      </div>

      <ul className="flex">
        {navLinks.map((navLink, id) => (
          <li key={id} className="p-2 text-slate-300 hover:text-slate-100 transition ease-in-out delay-50 duration-200">
            <Link to={navLink.to} className="btn btn-link">{navLink.title}</Link>
          </li>
        ))}
        {status === 'unauthenticated'
          ? <>
            <li className="p-2 text-slate-300 hover:text-slate-50">
              <Link to="/sign-in" className="btn btn-link">Sign In</Link>
            </li>
            <li className="p-2 text-slate-300 hover:text-slate-50">
              <Link to="/create-account" className="btn btn-link">Create Account</Link>
            </li>
          </>
          : <li className="p-2 text-slate-300 hover:text-slate-50">
            <button onClick={() => { void auth.signOut() }}>Sign Out</button>
          </li>
        }
      </ul>
    </nav>
  )
}
