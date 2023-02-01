import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
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
  }
])

function App (): JSX.Element {
  return (
    <RouterProvider router={router} />
  )
}

export default App
