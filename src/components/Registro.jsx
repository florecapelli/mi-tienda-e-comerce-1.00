import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/FormStyles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Registro() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");

  const { registrar } = useAuthContext();
  const navigate = useNavigate();

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const esAdmin = (email) => email === "admin@admin.com" || email === "admin2@admin.com";

  const handleRegistro = () => {
    setError("");

    if (!usuario || usuario.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres.");
      return;
    }

    if (!validarEmail(email)) {
      setError("El email no es válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const success = registrar(usuario, email, password, esAdmin(email));
    if (success) {
      navigate("/login");
    } else {
      setError("El usuario ya existe.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Crear una cuenta</h2>

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="form-input"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
      />

      <div style={{ position: "relative" }}>
        <input
          type={mostrarPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <span
          onClick={() => setMostrarPassword(!mostrarPassword)}
          className="form-toggle-icon"
        >
          {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={handleRegistro} className="form-button">
        Registrarse
      </button>

      {error && <p className="form-error">{error}</p>}

      <p className="form-text">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="form-link">
          Iniciá sesión acá
        </Link>
      </p>
    </div>
  );
}

export default Registro;





