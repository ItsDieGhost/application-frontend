import React, { useEffect, useState } from 'react'

const LOCAL_KEY = 'app_profile'

export default function Perfil() {
  const [profile, setProfile] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    role: 'Administrador',
    avatar: null, // data URL
  })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY)
      if (raw) setProfile(JSON.parse(raw))
    } catch (e) {
      console.warn('No se pudo leer perfil desde localStorage', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(profile))
      // Emitir evento para notificar a otros componentes  que el perfil cambió
      try {
        window.dispatchEvent(new CustomEvent('profile-updated', { detail: profile }))
      } catch (e) {
        // no crítico
      }
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
    // profile already persisted via effect
  }

  function handleCancel() {
    // Reload from storage to discard edits
    try {
      const raw = localStorage.getItem(LOCAL_KEY)
      if (raw) setProfile(JSON.parse(raw))
    } catch (e) {
      console.warn(e)
    }
    setEditing(false)
  }

  return (
    <div className="container py-4">
      <h2>Perfil de Usuario</h2>
      <div className="card p-4 mt-3">
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <img
              src={profile.avatar || 'https://via.placeholder.com/120?text=Avatar'}
              alt="Avatar"
              style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
              className="img-thumbnail"
            />
          </div>
          <div style={{ flex: 1 }}>
            {!editing && (
              <>
                <h5>Nombre:</h5>
                <p>{profile.name}</p>
                <h5>Email:</h5>
                <p>{profile.email}</p>
                <h5>Rol:</h5>
                <p>{profile.role}</p>
              </>
            )}

            {editing && (
              <div>
                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input name="name" className="form-control" value={profile.name} onChange={handleChange} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input name="email" className="form-control" value={profile.email} onChange={handleChange} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Rol</label>
                  <input name="role" className="form-control" value={profile.role} onChange={handleChange} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Foto de perfil</label>
                  <input type="file" accept="image/*" className="form-control" onChange={handleFile} />
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {!editing && (
              <button className="btn btn-primary" onClick={() => setEditing(true)}>
                Editar
              </button>
            )}
            {editing && (
              <>
                <button className="btn btn-success" onClick={handleSave}>
                  Guardar
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}