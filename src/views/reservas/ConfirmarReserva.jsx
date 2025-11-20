import React from "react"
import { CCard, CCardHeader, CCardBody, CButton } from "@coreui/react"

const ConfirmarReserva = () => {
  return (
    <CCard>
      <CCardHeader>Confirmar Reserva</CCardHeader>
      <CCardBody>
        <p>Detalle final de la reserva antes de confirmar.</p>
        <CButton color="success">Confirmar</CButton>
      </CCardBody>
    </CCard>
  )
}

export default ConfirmarReserva
