import React from 'react'
import { CCard, CCardBody, CFormInput, CButton } from '@coreui/react'

const BuscarEstacionamiento = () => {
  return (
    <CCard>
      <CCardBody>
        <h3>Buscar Estacionamiento</h3>
        <p>Ingresa tu ubicación o permite el GPS.</p>

        <CFormInput placeholder="Dirección o lugar" className="mb-3" />
        <CButton color="success">Buscar</CButton>

        <div className="mt-4" style={{ height: '400px', background: '#222', borderRadius: '10px' }}>
          <h5 className="text-center text-light mt-5">Mapa de google</h5>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default BuscarEstacionamiento
