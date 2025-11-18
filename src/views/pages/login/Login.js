import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../../../styles/auth.css"

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

const Login = () => {

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
    onload = () => {
      particlesJS("particles-js", {
        particles: {
          number: { value: 50 },
          color: { value: "#ff0000ff" },
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

      {/* Fondo animado */}
      <div id="particles-js"></div>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>

              {/* Formulario */}
              <CCard className="p-4 auth-card">
                <CCardBody>
                  <CForm>

                    <h1 className="auth-title">Iniciar Sesión</h1>
                    <p className="text-body-secondary">Accede a tu cuenta</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText className="auth-input-icon">
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Correo"
                        autoComplete="username"
                        className="auth-input"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText className="auth-input-icon">
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        className="auth-input"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4 auth-btn">
                          Entrar
                        </CButton>
                      </CCol>

                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0 auth-link">
                          ¿Olvidaste tu contraseña?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              {/* Lado derecho */}
              <CCard className="text-white bg-primary py-5 auth-side">
                <CCardBody className="text-center">
                  <div>
                    <h2>Crear cuenta</h2>
                    <p>
                      Únete a MySpot y reserva tu puesto rápidamente.
                    </p>
                    <Link to="/register">
                      <CButton color="light" className="mt-3 px-4">
                        Registrarse
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
