import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div className="d-flex">
      <AppSidebar />

      <div className="wrapper d-flex flex-column min-vh-100 w-100">
        <AppHeader />

        <div className="body flex-grow-1 px-3">
          <AppContent />
          {/*  Aquí se renderizan todas las rutas internas */}
          <Outlet />
        </div>

        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
