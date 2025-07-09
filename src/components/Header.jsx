import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Estilos externos

function Header() {
  const { usuario, logout } = useAuthContext();

  return (
    <header className="header" role="banner">
      {/* Elemento decorativo, ignorado por lectores de pantalla */}
      <div className="header-background" aria-hidden="true"></div>

      <div className="header-content">
        <h1 tabIndex="0">Bienvenidos a Siempre Bella</h1>
        <p tabIndex="0">Belleza natural al alcance de todos</p>

        {usuario ? (
          <div className="header-user" aria-live="polite">
            <span>Hola, {usuario}</span>
            <button
              className="btn-logout"
              onClick={logout}
              aria-label="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="header-login" aria-live="polite">
            <Link to="/login" className="btn-login" aria-label="Iniciar sesión">
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
