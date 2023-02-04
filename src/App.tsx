import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
<<<<<<< HEAD
import { auth } from './lib/firebase'
import { UserProvider } from './lib/user'
import CreateAccountPage from './pages/CreateAccount'
import EmployerProfile, { loadEmployer } from './pages/EmployerProfile'
import HomePage from './pages/HomePage/HomePage'
import { loadProfile } from './pages/ProfilePage'
import SignInPage from './pages/SignIn'
import StudentProfile, { loadStudent } from './pages/StudentProfile'
import TasksPage, { loadTasks } from './pages/TasksPage/TasksPage'
=======
import 'bootstrap/dist/css/bootstrap.min.css'
>>>>>>> origin/cardtsks_newtsks

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
        path: '/employer/:id',
        element: <EmployerProfile />,
        loader: loadEmployer
      },
      {
        path: '/student/:id',
        element: <StudentProfile />,
        loader: loadStudent
      },
      {
        path: '/create-account',
        element: <CreateAccountPage />
      },
      {
        path: '/sign-in',
        element: <SignInPage />
      },
      {
        path: '/sign-out',
        loader: async () => {
          await auth.signOut()
          return redirect('/')
        }
      }
    ]
  }
])

function App (): JSX.Element {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
