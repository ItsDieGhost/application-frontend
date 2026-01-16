import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Registro_de_veiculos.css';

const RegistroDeVeiculos = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    color: '',
    propietario: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'addVehiculo', payload: formData }); // Agregar al estado global
    alert('El vehículo ha sido registrado correctamente.');
    console.log('Datos del vehículo:', formData); // Confirmación adicional en consola
  };

  return (
    <div className="registro-veiculos-container">
      <h2 className="registro-veiculos-title">Registrar Vehículo</h2>
      <form onSubmit={handleSubmit} className="registro-veiculos-form">
        <div className="form-group">
          <label>Placa:</label>
          <input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Propietario:</label>
          <input
            type="text"
            name="propietario"
            value={formData.propietario}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroDeVeiculos;