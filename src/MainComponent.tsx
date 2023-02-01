import { Route, Routes, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage'

export default function MainCompenent (): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </div>
  )
}