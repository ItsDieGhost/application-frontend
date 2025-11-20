import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
} from '@coreui/react'

const LOCAL_KEY = 'app_profile'

export default function Perfil() {
  const [profile, setProfile] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    role: 'Conductor',
    avatar: null, // data URL
  })
  const [editing, setEditing] = useState(false)

  // Leer perfil desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY)
      if (raw) setProfile(JSON.parse(raw))
    } catch (e) {
      console.warn('No se pudo leer perfil desde localStorage', e)
    }
  }, [])

  // Guardado automático al cambiar profile
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(profile))
    } catch (e) {
      console.warn('No se pudo guardar perfil en localStorage', e)
    }
  }, [profile])

  function handleChange(e) {
    const { name, value } = e.target
    setProfile((p) => ({ ...p, [name]: value }))
  }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      setProfile((p) => ({ ...p, avatar: ev.target.result }))
    }
    reader.readAsDataURL(file)
  }

  function handleSave() {
    setEditing(false)
  }

  function handleCancel() {
    try {
      const raw = localStorage.getItem(LOCAL_KEY)
      if (raw) setProfile(JSON.parse(raw))
    } catch (e) {
      console.warn(e)
    }
    setEditing(false)
  }

  return (
    <div className="px-3 py-4">
      <CCard>
        <CCardHeader>
          <h4 className="m-0">Perfil del Usuario</h4>
        </CCardHeader>

        <CCardBody>
          <CRow className="align-items-center">
            {/* Imagen */}
            <CCol md="4" className="text-center mb-3">
              <img
                src={profile.avatar || 'https://via.placeholder.com/150?text=Avatar'}
                alt="Avatar"
                style={{
                  width: 150,
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: 10,
                }}
                className="border"
              />

              {editing && (
                <div className="mt-3">
                  <CFormLabel>Foto de perfil</CFormLabel>
                  <CFormInput type="file" accept="image/*" onChange={handleFile} />
                </div>
              )}
            </CCol>

            {/* Datos */}
            <CCol md="6">
              {!editing && (
                <>
                  <h5>Nombre</h5>
                  <p>{profile.name}</p>

                  <h5>Email</h5>
                  <p>{profile.email}</p>

                  <h5>Rol</h5>
                  <p>{profile.role}</p>
                </>
              )}

              {editing && (
                <>
                  <div className="mb-3">
                    <CFormLabel>Nombre</CFormLabel>
                    <CFormInput
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Email</CFormLabel>
                    <CFormInput
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Rol</CFormLabel>
                    <CFormInput
                      name="role"
                      value={profile.role}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </CCol>

            {/* Botones */}
            <CCol md="2" className="d-flex flex-column gap-2 mt-3">
              {!editing ? (
                <CButton color="primary" onClick={() => setEditing(true)}>
                  Editar
                </CButton>
              ) : (
                <>
                  <CButton color="success" onClick={handleSave}>
                    Guardar
                  </CButton>
                  <CButton color="secondary" onClick={handleCancel}>
                    Cancelar
                  </CButton>
                </>
              )}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}
