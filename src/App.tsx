import { Routes, Route } from 'react-router-dom'

import {
  Login,
  Register,
  Partidos,
  Apostar,
  Leaderboard,
  Dashboard,
  Settings
} from './pages'
import { ToastContainer } from 'react-toastify'
import { RequireAuth } from './components'

function App() {
  return (
    <>
      <ToastContainer
        position='bottom-center'
        theme='light'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
      />
      <Routes>
        <Route element={<RequireAuth />}>
          <Route element={<Partidos />} path='/partidos' />
          <Route element={<Apostar />} path='/apostar/:id' />
          <Route element={<Leaderboard />} path='/clasificatoria' />

          <Route element={<Dashboard />} path='/inicio' />
          <Route element={<Settings />} path='/configuracion' />
        </Route>

        <Route element={<Login />} path='/' />
        <Route element={<Register />} path='/register' />
      </Routes>
    </>
  )
}

export default App
