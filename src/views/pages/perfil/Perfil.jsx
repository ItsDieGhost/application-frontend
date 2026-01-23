import React, { useEffect, useState } from 'react';

const LOCAL_KEY = 'app_profil';

export default function Perfil() {
  const [profile, setProfile] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    role: 'Administrador',
    avatar: null,
  });
  const [editing, setEditing] = useState(false);
  const [registeringVehicle, setRegisteringVehicle] = useState(false);
  const [vehiclesModal, setVehiclesModal] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleForm, setVehicleForm] = useState({ placa: '', modelo: '', color: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch (e) { console.warn(e); }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent('profile-updated', { detail: profile }));
  }, [profile]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfile((p) => ({ ...p, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function handleSave() {
    setEditing(false);
    alert('El perfil se ha actualizado correctamente.'); // Confirmación visual
  }

  function handleCancel() {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) setProfile(JSON.parse(raw));
    setEditing(false);
  }

  function handleRegisterVehicle() {
    // Este handler ahora guarda en localStorage y en el estado local
    // Será usado como handler de submit del formulario
    // placeholder: la función real se reemplaza por la versión con evento
  }

  function handleRegisterVehicleSubmit(e) {
    e.preventDefault();
    const { placa, modelo, color } = vehicleForm;
    if (!placa || !modelo || !color) {
      alert('Por favor completa todos los campos del vehículo.');
      return;
    }

    try {
      const raw = localStorage.getItem('vehiculos');
      const arr = raw ? JSON.parse(raw) : [];
      const nuevo = { placa, modelo, color };
      arr.push(nuevo);
      localStorage.setItem('vehiculos', JSON.stringify(arr));
      setVehicles(arr);
      setVehicleForm({ placa: '', modelo: '', color: '' });
      setRegisteringVehicle(false);
      alert('Vehículo registrado');
    } catch (err) {
      console.error(err);
      alert('No se pudo guardar el vehículo.');
    }
  }

  function openVehiclesModal() {
    try {
      const raw = localStorage.getItem('vehiculos');
      const arr = raw ? JSON.parse(raw) : [];
      setVehicles(arr);
    } catch (err) {
      console.warn(err);
      setVehicles([]);
    }
    setVehiclesModal(true);
  }

  function handleVehicleFormChange(e) {
    const { name, value } = e.target;
    setVehicleForm((s) => ({ ...s, [name]: value }));
  }

  return (
    <div className="container py-4">
      <h2>Perfil de Usuario</h2>

      {/* TARJETA DE VISTA NORMAL */}
      <div className="card p-4 mt-3 shadow-sm">
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <img
            src={profile.avatar || 'https://via.placeholder.com/120?text=Avatar'}
            alt="Avatar"
            style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%' }}
          />
          <div style={{ flex: 1 }}>
            <h5>Nombre:</h5>
            <p>{profile.name}</p>
            <h5>Email:</h5>
            <p>{profile.email}</p>
          </div>
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            Editar Perfil
          </button>
        </div>
      </div>

      {/* VENTANA EMERGENTE (MODAL) PARA EDITAR PERFIL */}
      {editing && (
        <div style={modalOverlayStyle}>
          <div className="card p-4 shadow-lg" style={modalCardStyle}>
            <h4 className="mb-4">Editar Perfil</h4>
            
            <div className="mb-3 text-center">
              <img 
                src={profile.avatar || 'https://via.placeholder.com/120?text=Avatar'} 
                style={{width: 80, height: 80, borderRadius: '50%', marginBottom: '10px'}} 
                alt="preview"
              />
              <input type="file" accept="image/*" className="form-control form-control-sm" onChange={handleFile} />
            </div>

            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input name="name" className="form-control" value={profile.name} onChange={handleChange} />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" className="form-control" value={profile.email} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Rol</label>
              <input name="role" className="form-control" value={profile.role} onChange={handleChange} />
            </div>

            <div className="d-flex gap-2 justify-content-end mt-4">
              <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
              <button className="btn btn-success" onClick={handleSave}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* VENTANA EMERGENTE (MODAL) PARA REGISTRAR VEHÍCULO */}
      {registeringVehicle && (
        <div style={modalOverlayStyle}>
          <div className="card p-4 shadow-lg" style={modalCardStyle}>
            <h4 className="mb-4">Registrar Vehículo</h4>
            <form onSubmit={handleRegisterVehicleSubmit}>
              <div className="mb-3">
                <label className="form-label">Placa</label>
                <input name="placa" value={vehicleForm.placa} onChange={handleVehicleFormChange} className="form-control" placeholder="Ingrese la placa" />
              </div>
              <div className="mb-3">
                <label className="form-label">Modelo</label>
                <input name="modelo" value={vehicleForm.modelo} onChange={handleVehicleFormChange} className="form-control" placeholder="Ingrese el modelo" />
              </div>
              <div className="mb-3">
                <label className="form-label">Color</label>
                <input name="color" value={vehicleForm.color} onChange={handleVehicleFormChange} className="form-control" placeholder="Ingrese el color" />
              </div>
              <div className="d-flex gap-2 justify-content-end mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => { setRegisteringVehicle(false); setVehicleForm({ placa: '', modelo: '', color: '' }); }}>Cancelar</button>
                <button type="submit" className="btn btn-success">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VENTANA EMERGENTE (MODAL) PARA LISTAR VEHÍCULOS */}
      {vehiclesModal && (
        <div style={modalOverlayStyle}>
          <div className="card p-4 shadow-lg" style={modalCardStyle}>
            <h4 className="mb-4">Lista de Vehículos Registrados</h4>
            {vehicles && vehicles.length > 0 ? (
              <ul className="list-group">
                {vehicles.map((v, i) => (
                  <li key={i} className="list-group-item">
                    <strong>Placa:</strong> {v.placa} &nbsp; <strong>Modelo:</strong> {v.modelo} &nbsp; <strong>Color:</strong> {v.color}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay vehículos registrados.</p>
            )}
            <div className="d-flex gap-2 justify-content-end mt-4">
              <button className="btn btn-secondary" onClick={() => setVehiclesModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Botón para registrar vehículo */}
      <button className="btn btn-success mt-3" onClick={() => setRegisteringVehicle(true)}>Registrar Vehículo</button>

      {/* Botón para ver vehículos */}
      <button className="btn btn-info mt-3" onClick={openVehiclesModal}>Ver Vehículos</button>
    </div>
  );
}

// --- ESTILOS PARA EL EFECTO EMERGENTE ---
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro transparente
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000, // Asegura que esté por encima de todo
};

const modalCardStyle = {
  width: '100%',
  maxWidth: '500px',
  backgroundColor: 'rgb(0, 0, 0,0.5)',
  borderRadius: '12px',
};