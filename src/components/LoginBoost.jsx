import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/FormStyles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginBoost() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, admin } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    const success = login(email, password);
    if (success) {
      if (admin) navigate("/admin/panel");
      else navigate("/productos");
    } else {
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Iniciar sesión</h2>
      
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
          role="button"
          aria-label="Mostrar u ocultar contraseña"
        >
          {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={handleLogin} className="form-button">
        Iniciar sesión
      </button>

      {error && <p className="form-error">{error}</p>}

      <p className="form-text">
        ¿No tenés cuenta?{" "}
        <Link to="/registro" className="form-link">
          Registrate acá
        </Link>
      </p>
    </div>
  );
}

export default LoginBoost;
