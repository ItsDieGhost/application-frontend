import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilUser,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import './css_nav.js/style._nav.js.css' 

const _nav = [

  {
    component: CNavTitle,
    name: 'Administrador',
  },

  {
    component: CNavItem,
    name: 'Main',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
  component: CNavItem,
  name: 'Perfil',
  to: '/perfil',
  icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },

    {
    component: CNavItem,
    name: 'Reporte',
    to: '/reporte',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },

  {
  component: CNavItem,
  name: 'Estadísticas',
  to: '/estadisticas',
  icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Vigilante',
  },
  {
    component: CNavItem,
    name: 'Facturas',
    to: '/facturas',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Incidentes',
    to: '/incidentes',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Encuesta / Planilla',
    to: '/encuesta',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transacciones',
    to: '/transacciones',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Conductor',
  },

  {
    component: CNavItem,
    name: 'Reservacion',
    to: '/reservas/buscar',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
      


]

export default _nav
