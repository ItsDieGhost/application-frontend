import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './EncuestaAgregarPersonal.css';

const EncuestaAgregarPersonal = () => {
  const dispatch = useDispatch(); // Hook para usar dispatch
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    puesto: '',
    email: '',
    telefono: '', // Nuevo campo agregado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'addPersonalActivo', payload: formData }); // Agregar al personal activo
    alert('La información se ha agregado correctamente.'); // Mensaje de confirmación
    console.log('Datos del formulario:', formData); // Confirmación adicional en consola
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  return (
    <div className="encuesta-container">
      <h2 className="encuesta-title">Agregar Personal</h2>
      <form onSubmit={handleSubmit} className="encuesta-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Puesto:</label>
          <input
            type="text"
            name="puesto"
            value={formData.puesto}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Agregar</button>
      </form>
    </div>
  );
};

export default EncuestaAgregarPersonal;