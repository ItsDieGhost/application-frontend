import React, { useState, useEffect } from "react"
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api"
import QRCode from "qrcode"
import jsPDF from "jspdf"
import { color } from "chart.js/helpers"

const BuscarEstacionamiento = () => {

  // Guarda la ubicación actual del conductor
  const [currentLocation, setCurrentLocation] = useState(null)

  // Guarda la ruta generada por Google
  const [directions, setDirections] = useState(null)

  // Guarda el puesto seleccionado
  const [puesto, setPuesto] = useState("")

  // Centro del mapa (Sambil San Cristóbal)
  const sambil = {
    lat: 7.768779,
    lng: -72.224335
  }

  // Obtener ubicacion del usuario al cargar el componente
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
  }, [])

  // Trazar ruta al seleccionar el estacionamiento
  const trazarRuta = () => {
    if (!currentLocation) return

    const directionsService = new window.google.maps.DirectionsService()

    directionsService.route(
      {
        origin: currentLocation,
        destination: sambil,
        travelMode: "DRIVING"
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result)
        }
      }
    )
  }

  // Generar QR y PDF
  const generarQR = async () => {
    if (!puesto) return alert("Selecciona un puesto")

    const codigo = `MYSPOT-${Date.now()}-${puesto}`

    // Generar imagen del QR en base64
    const qrData = await QRCode.toDataURL(codigo)

    // Crear PDF
    const pdf = new jsPDF()
    pdf.text("Código QR de Acceso", 20, 20)
    pdf.text(`Puesto: ${puesto}`, 20, 30)
    pdf.addImage(qrData, "PNG", 20, 40, 150, 150)
    pdf.save(`qr-${puesto}.pdf`)
  }

  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: "40px",
      color: "#ffffffff"
      
    }}>

      <div style={{
        width: "400px",
        padding: "25px",
        borderRadius: "10px",
        backgroundColor: "#212121",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        
        <h2 style={{ textAlign: "center" }}>Buscar Estacionamiento</h2>

        <label>Seleccionar estacionamiento</label>
        <select
          className="form-select mb-3"
          onChange={trazarRuta}
        >
          <option value="">Seleccione</option>
          <option value="sambil">Sambil San Cristóbal</option>
        </select>

        <label>Seleccionar puesto</label>
        <select
          className="form-select mb-3"
          value={puesto}
          onChange={(e) => setPuesto(e.target.value)}
        >
          <option value="">Seleccione</option>
          <option>P1</option>
          <option>P2</option>
          <option>P3</option>
          <option>P4</option>
        </select>

        <button
          className="btn btn-primary w-100"
          onClick={generarQR}
        >
          Generar QR en PDF
        </button>
      </div>

      <div style={{ width: "600px", height: "400px", marginLeft: "20px" }}>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              libraries={["places"]}>

            <GoogleMap
              center={sambil}
              zoom={14}
              mapContainerStyle={{ width: "100%", height: "100%" }}>
              {directions && <DirectionsRenderer directions={directions} />}

            </GoogleMap>
        </LoadScript>
      </div>

    </div>
  )
}

export default BuscarEstacionamiento
