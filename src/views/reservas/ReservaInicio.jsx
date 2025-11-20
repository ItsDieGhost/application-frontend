import React from "react"
import { CCard, CCardBody, CCardHeader, CRow, CCol, CButton } from "@coreui/react"
import { Link } from "react-router-dom"

const ReservaInicio = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <h4>Reservas</h4>
            <p>Aquí puedes gestionar todas tus reservas de estacionamiento.</p>
          </CCardHeader>

          <CCardBody>
            <CRow className="g-3">

              <CCol md={6}>
                <Link to="/reservas/buscar">
                  <CButton color="primary" className="w-100">
                    Buscar estacionamiento
                  </CButton>
                </Link>
              </CCol>

              <CCol md={6}>
                <Link to="/reservas/historial">
                  <CButton color="secondary" className="w-100">
                    Historial de reservas
                  </CButton>
                </Link>
              </CCol>

            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ReservaInicio
