import React from 'react';
import { useSelector } from 'react-redux';
import './PersonalActivo.css';

const PersonalActivo = () => {
  const personalActivo = useSelector((state) => state.personalActivo); // Obtener datos del store

  return (
    <div className="personal-activo-container">
      <h2 className="personal-activo-title">Personal Activo</h2>
      <table className="personal-activo-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Puesto</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {personalActivo.map((persona, index) => (
            <tr key={index}>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.puesto}</td>
              <td>{persona.email}</td>
              <td>{persona.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalActivo;