import { Link } from 'react-router-dom'
import useAuth from '../lib/useAuth'

export default function NavBar (): JSX.Element {
  const { user, signOut } = useAuth()

  return (
    <nav className="flex justify-between items-center">
      <div><Link to="/">Logo</Link></div>

      <ul className="flex">
        <li className="p-2">
          <Link to="/" className="btn btn-link">Home</Link>
        </li>
        <li className="p-2">
          <Link to="/tasks" className="btn btn-link">Tasks</Link>
        </li>
        <li className="p-2">
          <Link to="/profile" className="btn btn-link">Profile</Link>
        </li>
        <li className="p-2">
          {(user == null)
            ? <>
              <Link to="/sign-in" className="btn btn-link">Sign In</Link>
              <Link to="/create-account" className="btn btn-link">Create Account</Link>
              </>
            : <button onClick={() => { void signOut() }}>Sign Out</button>}
        </li>
      </ul>
    </nav>
  )
}
