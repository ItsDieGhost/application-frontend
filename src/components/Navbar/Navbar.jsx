import React from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";


function Navbar() {
    return (
    // Usa un div o <header> en lugar de <navbar> para mayor compatibilidad con React/HTML5
    <header className="navbar"> 
        {/* Usar Link para el logo para volver a la página de inicio */}
        <Link to="/" className="logo">MySpot</Link>
        
        <nav className="nav-links">
        {/* Reemplazar <a> con <Link> y usar 'to' en lugar de 'href' */}
        <Link to="/products">Products</Link>
        <Link to="/solutions">Solutions</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/extensions">Extensions</Link>
        <Link to="/docs">Docs</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/contact">Contact</Link>
        </nav>
        
        <div className="auth-buttons">
        {/* Enlace de Login que lleva a la ruta /login */}
        <Link to="/login" className="login">Log in</Link> 
        {/* El botón Sign up se mantiene como botón si aún no tiene ruta */}
        <button className="signup">Sign up</button> 
        </div>
    </header>
    );
}

export default Navbar;
