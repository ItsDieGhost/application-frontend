import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import ReservaInicio from './views/reservas/ReservaInicio'
import BuscarEstacionamiento from './views/reservas/BuscarEstacionamiento'
import SeleccionarEspacio from './views/reservas/SeleccionarEspacio'
import ConfirmarReserva from './views/reservas/ConfirmarReserva'
import HistorialReservas from './views/reservas/HistorialReservas'

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
          <Route path="/reservas" element={<ReservaInicio />} />
          <Route path="/reservas/buscar" element={<BuscarEstacionamiento />} />
          <Route path="/reservas/seleccionar" element={<SeleccionarEspacio />} />
          <Route path="/reservas/confirmar" element={<ConfirmarReserva />} />
          <Route path="/reservas/historial" element={<HistorialReservas />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
