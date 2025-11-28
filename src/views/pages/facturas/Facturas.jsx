import React, { } from 'react'

function encodeData(data) {
return encodeURIComponent(JSON.stringify(data))
}

function saveIngreso(factura){
try{
    const key = 'app_ingresos'
    const raw = localStorage.getItem(key)
    const arr = raw? JSON.parse(raw):[]
    const entry = { id: factura.id, fecha: factura.fecha, monto: factura.monto, descripcion: factura.descripcion, cliente: factura.cliente, source: 'factura' }
    arr.unshift(entry)
    localStorage.setItem(key, JSON.stringify(arr))
}catch(e){ console.error(e) }
}

export default function Facturas() {
const [cliente, setCliente] = useState('')
const [monto, setMonto] = useState('')
const [descripcion, setDescripcion] = useState('')
const [lastInvoice, setLastInvoice] = useState(null)

function crearFactura(e) {
    e.preventDefault()
    const id = 'F' + Date.now()
    const factura = { id, cliente, monto: parseFloat(monto || 0), descripcion, fecha: new Date().toISOString() }
    setLastInvoice(factura)
    // Guardar la factura como ingreso
    saveIngreso(factura)
    setCliente(''); setMonto(''); setDescripcion('')
}

function printInvoice(inv){
    // Generar QR como data URL para asegurar que aparezca en el PDF incluso sin conexión
    const data = encodeData(inv)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data}`

    function toDataUrl(url){
    return new Promise((resolve) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
        try{
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img,0,0)
            const dataUrl = canvas.toDataURL('image/png')
            resolve(dataUrl)
        }catch(e){
            // si falla, fallback a la URL original
            resolve(url)
        }
        }
        img.onerror = () => resolve(url)
        img.src = url
    })
    }

    toDataUrl(qrUrl).then(qrData => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Factura ${inv.id}</title><style>body{font-family:Arial;margin:20px;color:#111} .invoice{max-width:680px;margin:0 auto} .header{display:flex;justify-content:space-between;align-items:center} .qr{float:right}</style></head><body><div class="invoice"><div class="header"><div><h2>Factura ${inv.id}</h2><p>Cliente: ${inv.cliente}</p><p>Fecha: ${new Date(inv.fecha).toLocaleString()}</p></div><div class="qr"><img src="${qrData}" alt="QR"/></div></div><hr/><p><strong>Monto:</strong> $${inv.monto}</p><p><strong>Descripción:</strong> ${inv.descripcion}</p></div></body></html>`
    const w = window.open('','_blank')
    if(!w) { alert('El navegador bloqueó la apertura de la ventana. Permite popups o usa la opción de guardar PDF del navegador.'); return }
    w.document.write(html)
    w.document.close()
    w.focus()
      // Llamar a print; el usuario puede elegir "Guardar como PDF"
    w.print()
    })
}

return (
    <div className="container">
    <h2>Facturas</h2>
    <form onSubmit={crearFactura} className="mb-3">
        <div className="row g-2">
        <div className="col-md-4"><input className="form-control" placeholder="Cliente" value={cliente} onChange={e => setCliente(e.target.value)} required /></div>
        <div className="col-md-2"><input className="form-control" placeholder="Monto" type="number" value={monto} onChange={e => setMonto(e.target.value)} required /></div>
        <div className="col-md-4"><input className="form-control" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} /></div>
        <div className="col-md-2"><button className="btn btn-success" type="submit">Crear Factura</button></div>
        </div>
    </form>

    {lastInvoice && (
        <div className="card p-3">
        <h5>Factura creada: {lastInvoice.id}</h5>
        <p>Cliente: {lastInvoice.cliente}</p>
        <p>Monto: ${lastInvoice.monto}</p>
        <p>Descripción: {lastInvoice.descripcion}</p>
        <p>Fecha: {new Date(lastInvoice.fecha).toLocaleString()}</p>
            <div>
            <h6>QR de la factura</h6>
            {/* Usamos un servicio público para generar el QR (qrserver) */}
            <img alt="QR factura" src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeData(lastInvoice)}`} />
            <p className="small text-muted">Escanea el QR para ver los datos de la factura (JSON)</p>
            <div className="mt-2">
                <button className="btn btn-primary me-2" onClick={() => printInvoice(lastInvoice)}>Imprimir / Guardar como PDF</button>
            </div>
            </div>
        </div>
        )}
    </div>
    )
}
