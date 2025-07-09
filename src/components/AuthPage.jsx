import React, { useState } from "react";
import Login from "./Login";
import Register from "./Registro";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLoginView((prev) => !prev);
  };

  // Función para manejar el éxito en login o registro
  const handleSuccess = (usuario) => {
    login(usuario);  // Guardamos al usuario en el contexto
    navigate("/");    // Redirige al inicio después de loguear o registrar
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {isLoginView ? (
          <Login onSuccess={handleSuccess} />
        ) : (
          <Register onSuccess={handleSuccess} />
        )}

        {/* Botón para alternar entre login y registro */}
        <button
          onClick={handleToggle}
          style={styles.toggleBtn}
          aria-pressed={isLoginView}
        >
          {isLoginView
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  toggleBtn: {
    marginTop: "1rem",
    width: "100%",
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default AuthPage;
