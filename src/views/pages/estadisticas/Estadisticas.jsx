import React from 'react'

function read(key){ try{ const s = localStorage.getItem(key); return s? JSON.parse(s):[] }catch(e){return []} }

export default function Estadisticas(){
const cars = read('app_cars')
const ingresos = read('app_ingresos')
const egresos = read('app_egresos')
const incidentes = read('app_incidentes')

const totals = {
    carros: cars.length,
    ingresos: ingresos.reduce((s,x)=>s+(Number(x.monto)||0),0),
    egresos: egresos.reduce((s,x)=>s+(Number(x.monto)||0),0),
    incidentes: incidentes.length
}

return (
    <div className="container">
    <h2>Estadísticas</h2>
    <div className="row">
        <div className="col-md-3"><div className="card p-3"><strong>Carros</strong><div className="display-6">{totals.carros}</div></div></div>
        <div className="col-md-3"><div className="card p-3"><strong>Ingresos</strong><div className="display-6">${totals.ingresos.toFixed(2)}</div></div></div>
        <div className="col-md-3"><div className="card p-3"><strong>Egresos</strong><div className="display-6">${totals.egresos.toFixed(2)}</div></div></div>
        <div className="col-md-3"><div className="card p-3"><strong>Incidentes</strong><div className="display-6">{totals.incidentes}</div></div></div>
    </div>

    <h4 className="mt-3">Detalles de incidentes</h4>
    <table className="table">
        <thead><tr><th>Fecha</th><th>Placa</th><th>Nombre</th><th>Descripción</th><th>Gravedad</th></tr></thead>
        <tbody>
        {incidentes.map(i => (<tr key={i.id}><td>{i.fecha}</td><td>{i.placa}</td><td>{i.nombre}</td><td>{i.descripcion}</td><td>{i.gravedad}</td></tr>))}
        </tbody>
    </table>

    <h4 className="mt-3">Ingresos recientes</h4>
    <table className="table">
        <thead><tr><th>Fecha</th><th>Monto</th><th>Descripción</th></tr></thead>
        <tbody>
        {ingresos.map(i => (<tr key={i.id}><td>{new Date(i.fecha).toLocaleString()}</td><td>${i.monto}</td><td>{i.descripcion}</td></tr>))}
        </tbody>
        </table>

        <h4 className="mt-3">Egresos recientes</h4>
        <table className="table">
        <thead><tr><th>Fecha</th><th>Monto</th><th>Descripción</th><th>Justificación</th></tr></thead>
        <tbody>
            {egresos.map(i => (<tr key={i.id}><td>{new Date(i.fecha).toLocaleString()}</td><td>${i.monto}</td><td>{i.descripcion}</td><td>{i.justificacion}</td></tr>))}
        </tbody>
        </table>
    </div>
    )
}
