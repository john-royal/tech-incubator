import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import CreateAccountPage from './pages/CreateAccount'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SignInPage from './pages/SignIn'
import TasksPage from './pages/TasksPage/TasksPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/tasks',
    element: <TasksPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/create-account',
    element: <CreateAccountPage />
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  }
])

function App (): JSX.Element {
  return (
    <RouterProvider router={router} />
  )
}

export default App
