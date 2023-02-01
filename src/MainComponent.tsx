import { Route, Routes, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import TasksPage from './pages/TasksPage/TasksPage'

export default function MainCompenent (): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/tasks' element={<TasksPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  )
}