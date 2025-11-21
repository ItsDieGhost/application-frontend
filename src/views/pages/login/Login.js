import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

  const navigate = useNavigate()

  // Estados para manejar el login
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  

  
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
    script.async = true
    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 200 },
          color: { value: "#989898" },
          shape: { type: "circle" },
          opacity: { value: 1 },
          size: { value: 7 },
          move: { speed: 1 }
        }
      })
    }
    document.body.appendChild(script)
  }, [])


  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("myspot_user"))


    if (!savedUser) {
      setError("No existe un usuario registrado. Crea una cuenta primero.")
      return
    }

    // Validar credenciales
    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("myspot_logged", "true") // Marca sesión iniciada
      navigate("/dashboard")
    } else {
      setError("Correo o contraseña incorrectos.")
    }
  }

  return (
    <div className="auth-bg">

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>

                    {/* Mensaje de error */}
                    {error && (
                      <p style={{ color: "red", marginBottom: "10px" }}>
                        {error}
                      </p>
                    )}

                    <CRow>
                      <CCol xs={6}>
                        <CButton 
                          color="primary" 
                          className="px-4 auth-btn"
                          onClick={handleLogin}
                        >
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
