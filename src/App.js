import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import "./App.css"

// Layout CoreUI
import DefaultLayout from './layout/DefaultLayout'

// Vistas públicas
import Landing from './views/landing/Landing'
import Login from './views/pages/login/Login'
import Register from './views/pages/register/Register'

// Dashboard
import Dashboard from './views/dashboard/Dashboard'

// Vistas de reservas (IMPORTANTE)
import BuscarEstacionamiento from './views/reservas/BuscarEstacionamiento'
import Perfil from './views/pages/perfil/Perfil'
import Reporte from './views/pages/reporte/Reporte';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas internas */}
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservas/buscar" element={<BuscarEstacionamiento />} />
          <Route path="/perfil" element={<Perfil />} /> 
          <Route path="/reporte" element={<Reporte />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
