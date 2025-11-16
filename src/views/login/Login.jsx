import React from "react";
import './Login.css';


function Login() {
    return(
        <div className="login-container">
            {/* parte izquierda*/}
            <div className="login-left">
                <h1>Bienvenido a <span>Myspot</span></h1>
                <p>Encuentra y reserva tu lugar de estacionamiento en segundos</p>
                </div>
            {/* Eparte derecha */}
            <div className="login-right">
                <div className="background-animation"></div>
                <form className="login-form">
                    <h2>Iniciar Sesion</h2>
                    
                    <label>Email</label>
                    <input type="email" placeholder="youremail@gmail.com" />
                    <label>Password</label>
                    <input type="password" placeholder="enter a unique password" />
                    <button type="submit">enter</button>
                    <p className="register-text">
                        ¿No tienes cuenta? <a href="#!">Regístrate</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;