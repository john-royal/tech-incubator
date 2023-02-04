import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import { auth } from './lib/firebase'
import { UserProvider } from './lib/user'
import CreateAccountPage from './pages/auth/CreateAccount'
import SignInPage from './pages/auth/SignIn'
import EmployerProfile, { loadEmployer } from './pages/EmployerProfile'
import HomePage from './pages/HomePage'
import StudentProfile, { loadStudent } from './pages/StudentProfile'
import EditTaskForm, { loadEmployer as loadEmployerForTask } from './pages/tasks/EditTaskForm'
import TasksPage, { loadTasks } from './pages/tasks/TasksPage'
import TaskView, { loadTask } from './pages/tasks/TaskView'

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
        path: '/task/new',
        element: <EditTaskForm />,
        loader: loadEmployerForTask
      },
      {
        path: '/task/:id',
        element: <TaskView />,
        loader: loadTask
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
