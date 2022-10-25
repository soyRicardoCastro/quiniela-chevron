import React from 'react'
import { Login, Register } from './pages'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route element={<Login />} path='/' />
      <Route element={<Register />} path='/register' />

    </Routes>
  )
}

export default App