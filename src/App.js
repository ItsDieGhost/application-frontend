import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"

// Layout de CoreUI
import DefaultLayout from './layout/DefaultLayout'

// Vistas públicas
import Landing from './views/landing/Landing'
import Login from './views/pages/login/Login'
import Register from './views/pages/register/Register'


// Vistas internas (CoreUI)
import Dashboard from './views/dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🚀Rutas públicas (sin CoreUI) */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Rutas internas con CoreUI */}
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
