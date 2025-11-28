import React from 'react'

function read(key){ try{ const s = localStorage.getItem(key); return s? JSON.parse(s):[] }catch(e){return []} }

export default function Encuesta(){
    const incidentes = read('app_incidentes')
    const cars = read('app_cars')

    return (
    <div className="container">
        <h2>Estadisticas de reportes</h2>
        <p>Resumen rápido de estadísticas y últimos incidentes.</p>
        <div className="row">
        <div className="col-md-6 card p-3">
            <h5>Resumen</h5>
            <p>Carros: <strong>{cars.length}</strong></p>
            <p>Incidentes: <strong>{incidentes.length}</strong></p>
        </div>
        <div className="col-md-6 card p-3">
            <h5>Últimos incidentes</h5>
            <ul>
            {incidentes.slice(0,5).map(i => <li key={i.id}>{i.fecha} - {i.descripcion} ({i.gravedad})</li>)}
            {incidentes.length===0 && <li>No hay incidentes.</li>}
            </ul>
        </div>
        </div>
    </div>
    )
}
