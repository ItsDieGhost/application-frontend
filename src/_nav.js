import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
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

const _nav = [
  {
    component: CNavItem,
    name: 'Main',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },


  {
    component: CNavTitle,
    name: 'Apps',
  },
{
  component: CNavGroup,
  name: 'Reservar',
  to: '/reservas',
  icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,

  items: [
    {
      component: CNavItem,
      name: 'Buscar Estacionamiento',
      to: '/reservas/buscar',
    },
    {
      component: CNavItem,
      name: 'Seleccionar Espacio',
      to: '/reservas/seleccionar',
    },
    {
      component: CNavItem,
      name: 'Confirmar Reserva',
      to: '/reservas/confirmar',
    },
    {
      component: CNavItem,
      name: 'Historial de Reservas',
      to: '/reservas/historial',
    },
  ],
}


]

export default _nav
