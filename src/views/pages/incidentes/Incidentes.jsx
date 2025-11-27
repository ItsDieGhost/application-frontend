import React, { useState, useEffect } from 'react'

const STORAGE = 'app_incidentes'

export default function Incidentes(){
const [incidentes, setIncidentes] = useState([])
const [form, setForm] = useState({ fecha: '', placa: '', nombre: '', descripcion: '', gravedad: 'Baja' })
const [editingId, setEditingId] = useState(null)

useEffect(() => {
    const s = localStorage.getItem(STORAGE)
    if(s) setIncidentes(JSON.parse(s))
}, [])
useEffect(() => localStorage.setItem(STORAGE, JSON.stringify(incidentes)), [incidentes])

function onChange(e){ setForm({...form, [e.target.name]: e.target.value }) }
function addOrUpdate(e){
    e.preventDefault()
    if(editingId){
    setIncidentes(prev => prev.map(it => it.id === editingId ? { ...it, ...form, id: editingId } : it))
    setEditingId(null)
    } else {
    const id = Date.now(); setIncidentes(i => [{id, ...form}, ...i])
    }
    setForm({ fecha:'', placa:'', nombre:'', descripcion:'', gravedad:'Baja' })
}

function startEdit(id){
    const it = incidentes.find(x => x.id === id)
    if(!it) return
    setForm({ fecha: it.fecha || '', placa: it.placa || '', nombre: it.nombre || '', descripcion: it.descripcion || '', gravedad: it.gravedad || 'Baja' })
    setEditingId(id)
}

function cancelEdit(){ setEditingId(null); setForm({ fecha:'', placa:'', nombre:'', descripcion:'', gravedad:'Baja' }) }

function removeOne(id){ setIncidentes(prev => prev.filter(x => x.id !== id)) }

function exportCSV(){
    const rows = [['id','fecha','placa','nombre','descripcion','gravedad'], ...incidentes.map(x=>[x.id,x.fecha,x.placa||'',x.nombre||'',x.descripcion,x.gravedad])]
    const csv = rows.map(r=>r.map(c=>`"${(''+c).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'incidentes.csv'; a.click(); URL.revokeObjectURL(url)
}

    return (
    <div className="container">
        <h2>Incidentes</h2>
        <form onSubmit={addOrUpdate} className="mb-3">
        <div className="row g-2">
            <div className="col-md-2"><input className="form-control" name="fecha" type="date" value={form.fecha} onChange={onChange} required /></div>
            <div className="col-md-2"><input className="form-control" name="placa" placeholder="Placa vehículo" value={form.placa} onChange={onChange} /></div>
            <div className="col-md-3"><input className="form-control" name="nombre" placeholder="Nombre persona" value={form.nombre} onChange={onChange} /></div>
            <div className="col-md-3"><input className="form-control" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={onChange} required /></div>
            <div className="col-md-1"><select className="form-select" name="gravedad" value={form.gravedad} onChange={onChange}><option>Baja</option><option>Media</option><option>Alta</option></select></div>
            <div className="col-md-1">
            <button className="btn btn-primary" type="submit">{editingId ? 'Guardar' : 'Añadir'}</button>
            </div>
            {editingId && <div className="col-md-1"><button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancelar</button></div>}
        </div>
        </form>

        <div className="mb-3">
        <button className="btn btn-outline-success me-2" onClick={exportCSV}>Exportar planilla (CSV)</button>
        <button className="btn btn-outline-danger" onClick={() => { localStorage.removeItem(STORAGE); setIncidentes([]) }}>Borrar todos</button>
        </div>

        <table className="table">
        <thead><tr><th>Fecha</th><th>Placa</th><th>Nombre</th><th>Descripción</th><th>Gravedad</th><th>Acciones</th></tr></thead>
        <tbody>
            {incidentes.map(it=> (
            <tr key={it.id}>
                <td>{it.fecha}</td>
                <td>{it.placa}</td>
                <td>{it.nombre}</td>
                <td>{it.descripcion}</td>
                <td>{it.gravedad}</td>
                <td>
                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => startEdit(it.id)}>Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => removeOne(it.id)}>Eliminar</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    )
}
