import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  
  // Cargar ParticlesJS al montar el componente
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 300 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 7 },
          move: { speed: 1 }
        }
      })
    }
    document.body.appendChild(script)
  }, [])

  return (
    <div className="auth-bg">
      <div id="particles-js"></div>

      <CContainer className="position-relative">
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="auth-card">
              <CCardBody className="p-4">
                <CForm>
                  <h1 className="auth-title">Crear Cuenta</h1>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <button className="auth-btn">Crear Cuenta</button>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
