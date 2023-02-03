import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import CreateAccountPage from './pages/CreateAccount'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SignInPage from './pages/SignIn'
import TasksPage, { loadTasks } from './pages/TasksPage/TasksPage'
import NavBar from './components/NavBar'

const HeaderLayout = (): JSX.Element => (
  <>
    <NavBar />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/tasks',
        element: <TasksPage />,
        loader: loadTasks
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
    ]
  }
])

function App (): JSX.Element {
  return (
    <RouterProvider router={router} />
  )
}

export default App
