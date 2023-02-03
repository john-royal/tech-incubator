import { Link } from 'react-router-dom'
import useAuth from '../lib/useAuth'

export default function NavBar (): JSX.Element {
  const { user, signOut } = useAuth()

  return (
    <nav className="flex justify-between items-center">
      <div className="pl-2">
        <Link to="/">Logo</Link>
      </div>

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
        {(user == null) ? 
          <>
            <li className="p-2">
              <Link to="/sign-in" className="btn btn-link">Sign In</Link>
            </li>
            <li className="p-2">
              <Link to="/create-account" className="btn btn-link">Create Account</Link>
            </li>
          </>
          : 
          <li className="p-2">
            <button onClick={() => { void signOut() }}>Sign Out</button>
          </li>
        }  
      </ul>
    </nav>
  )
}
