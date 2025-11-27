import React from 'react'

// Simple report that summarizes data from localStorage (cars, transactions, incidents)
function read(key){ try{ const s = localStorage.getItem(key); return s? JSON.parse(s):[] }catch(e){return []} }

export default function Reporte(){
  const cars = read('app_cars')
  const ingresos = read('app_ingresos')
  const egresos = read('app_egresos')
  const incidentes = read('app_incidentes')

  const totalIngresos = ingresos.reduce((s,x)=>s+(Number(x.monto)||0),0)
  const totalEgresos = egresos.reduce((s,x)=>s+(Number(x.monto)||0),0)

  return (
    <div className="container">
      <h2>Reporte</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h5>Carros registrados</h5>
            <p className="display-6">{cars.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h5>Ingresos</h5>
            <p className="display-6">${totalIngresos.toFixed(2)}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h5>Egresos</h5>
            <p className="display-6">${totalEgresos.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <h4>Incidentes recientes</h4>
      <ul>
        {incidentes.slice(0,5).map(it => <li key={it.id}>{it.fecha} — {it.placa?`Placa: ${it.placa} · `:''}{it.nombre?`Persona: ${it.nombre} · `:''}{it.descripcion} ({it.gravedad})</li>)}
        {incidentes.length===0 && <li>No hay incidentes registrados.</li>}
      </ul>

      <div className="row mt-3">
        <div className="col-md-6">
          <h5>Últimos ingresos</h5>
          <table className="table"><thead><tr><th>Fecha</th><th>Monto</th><th>Descripción</th></tr></thead>
            <tbody>{ingresos.slice(0,5).map(i=> (<tr key={i.id}><td>{new Date(i.fecha).toLocaleString()}</td><td>${i.monto}</td><td>{i.descripcion}</td></tr>))}</tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h5>Últimos egresos</h5>
          <table className="table"><thead><tr><th>Fecha</th><th>Monto</th><th>Descripción</th><th>Justificación</th></tr></thead>
            <tbody>{egresos.slice(0,5).map(i=> (<tr key={i.id}><td>{new Date(i.fecha).toLocaleString()}</td><td>${i.monto}</td><td>{i.descripcion}</td><td>{i.justificacion}</td></tr>))}</tbody>
          </table>
        </div>
      </div>

      <p className="text-muted small">Nota: los datos se guardan en localStorage (claves: app_cars, app_ingresos, app_egresos, app_incidentes).</p>
    </div>
  )
}
