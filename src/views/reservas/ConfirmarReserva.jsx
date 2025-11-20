import React from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'

const ConfirmarReserva = () => {
  return (
    <CCard>
      <CCardBody>
        <h3>Confirmar Reserva</h3>
        <p>Verifica los datos antes de reservar.</p>

        <CButton color="success">Confirmar</CButton>
      </CCardBody>
    </CCard>
  )
}

export default ConfirmarReserva
