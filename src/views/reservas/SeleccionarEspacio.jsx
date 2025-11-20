import React from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'

const SeleccionarEspacio = () => {
  return (
    <CCard>
      <CCardBody>
        <h3>Seleccionar Espacio</h3>
        <p>Elige una plaza disponible.</p>

        <CButton color="primary">Confirmar Selección</CButton>
      </CCardBody>
    </CCard>
  )
}

export default SeleccionarEspacio
