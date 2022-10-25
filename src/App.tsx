import React from 'react'
import { Login, Register, Partidos } from './pages'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route element={<Login />} path='/' />
      <Route element={<Register />} path='/register' />
      <Route element={<Partidos />} path='/partidos' />
    </Routes>
  )
}

export default App