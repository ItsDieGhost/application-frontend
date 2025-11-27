import React, { useState, useEffect } from 'react'

const KEY_ING = 'app_ingresos'
const KEY_EGR = 'app_egresos'

function read(key){ try{ const s = localStorage.getItem(key); return s? JSON.parse(s):[] }catch(e){return []} }

export default function Transacciones(){
const [tipo, setTipo] = useState('Ingreso')
const [monto, setMonto] = useState('')
const [descripcion, setDescripcion] = useState('')
const [justificacion, setJustificacion] = useState('')
const [ingresos, setIngresos] = useState([])
const [egresos, setEgresos] = useState([])

useEffect(()=>{ setIngresos(read(KEY_ING)); setEgresos(read(KEY_EGR)); }, [])

useEffect(()=> localStorage.setItem(KEY_ING, JSON.stringify(ingresos)), [ingresos])
useEffect(()=> localStorage.setItem(KEY_EGR, JSON.stringify(egresos)), [egresos])

function add(e){
    e.preventDefault()
    const id = Date.now()
    const fecha = new Date().toISOString()
    const entry = { id, fecha, monto: Number(monto||0), descripcion, justificacion: justificacion || '' }
    if(tipo === 'Ingreso'){
        setIngresos(i => [entry, ...i])
    } else {
        if(!justificacion){ alert('La justificación es obligatoria para egresos'); return }
        setEgresos(egr => [entry, ...egr])
    }
    setMonto(''); setDescripcion(''); setJustificacion('')
    }

    function del(key, id){
    if(key === KEY_ING) setIngresos(i => i.filter(x=>x.id!==id))
    else setEgresos(e => e.filter(x=>x.id!==id))
    }

    const totalIngresos = ingresos.reduce((s,x)=>s+(Number(x.monto)||0),0)
    const totalEgresos = egresos.reduce((s,x)=>s+(Number(x.monto)||0),0)

    return (
    <div className="container">
        <h2>Transacciones (Ingresos / Egresos)</h2>
        <form onSubmit={add} className="mb-3">
        <div className="row g-2 align-items-center">
            <div className="col-md-2">
            <select className="form-select" value={tipo} onChange={e=>setTipo(e.target.value)}>
                <option>Ingreso</option>
                <option>Egreso</option>
            </select>
            </div>
            <div className="col-md-2"><input className="form-control" placeholder="Monto" type="number" value={monto} onChange={e=>setMonto(e.target.value)} required /></div>
            <div className="col-md-4"><input className="form-control" placeholder="Descripción" value={descripcion} onChange={e=>setDescripcion(e.target.value)} /></div>
            <div className="col-md-3"><input className="form-control" placeholder="Justificación (oblig. para egresos)" value={justificacion} onChange={e=>setJustificacion(e.target.value)} /></div>
            <div className="col-md-1"><button className="btn btn-primary" type="submit">Añadir</button></div>
        </div>
        </form>

        <div className="row mb-3">
        <div className="col-md-6"><div className="card p-3"><h6>Ingresos</h6><p className="display-6">${totalIngresos.toFixed(2)}</p></div></div>
        <div className="col-md-6"><div className="card p-3"><h6>Egresos</h6><p className="display-6">${totalEgresos.toFixed(2)}</p></div></div>
        </div>

        <div className="row">
        <div className="col-md-6">
            <h5>Lista de ingresos</h5>
            <table className="table"><thead><tr><th>Fecha</th><th>Monto</th><th>Descripción</th><th></th></tr></thead>
            <tbody>{ingresos.map(i=> (<tr key={i.id}><td>{new Date(i.fecha).toLocaleString()}</td><td>${i.monto}</td><td>{i.descripcion}</td><td><button className="btn btn-sm btn-danger" onClick={()=>del(KEY_ING,i.id)}>Eliminar</button></td></tr>))}</tbody>
            </table>
        </div>
        <div className="col-md-6">
            <h5>Lista de egresos</h5>
            <table className="table"><thead><tr><th>Fecha</th><th>Monto</th><th>Descripción</th><th>Justificación</th><th></th></tr></thead>
            <tbody>{egresos.map(i=> (<tr key={i.id}><td>{new Date(i.fecha).toLocaleString()}</td><td>${i.monto}</td><td>{i.descripcion}</td><td>{i.justificacion}</td><td><button className="btn btn-sm btn-danger" onClick={()=>del(KEY_EGR,i.id)}>Eliminar</button></td></tr>))}</tbody>
            </table>
        </div>
        </div>
    </div>
    )
}
