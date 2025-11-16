import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate(); // Hook para navegar entre páginas

    return (
    <section className="hero">
      <div className="hero-content">
        <div className="text-section">
          <h1>
            Park Smarter with <span>MySpot</span>
          </h1>
          <p>
            The smart platform that helps you find, reserve, and pay for parking
            spots in real-time — effortlessly and securely.
          </p>

          <div className="buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Get Started
            </button>
            <button className="btn-secondary">Talk to us.</button>
          </div>


        <div className="feature-grid-container">
                
                {/* COLUMNA IZQUIERDA: Manage Spaces */}
                <div className="feature-card left-card">
                    <h2>
                        Manage spaces, reservations, and 
                        payments from a single <span>dashboard</span>
                    </h2>
                    <p className="feature-subheading">
                        Everything you need to manage parking, now in one centralized hub.
                    </p>
                </div>

                {/* COLUMNA DERECHA: Find, Reserve, Park */}
                <div className="feature-card right-card">
                    <h2>
                        Find, reserve, and park without <span>complications</span>.
                    </h2>
                    <p className="feature-subheading">
                        Automates parking management and allows you to control everything in one place.
                    </p>
                </div>

            </div>

          <h1>
            Smart map, stress-<span>free parking.</span>
          </h1>

          <p>
            Explore your city and find places thanks to MySpot integrations with
            Google Maps
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;