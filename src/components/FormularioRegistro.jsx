import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormularioRegistro.css";

export default function FormularioRegistro() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmarPassword: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Limpiar el error cuando el usuario modifica el campo
  };

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarContraseña = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(password); // Al menos 6 caracteres, una letra, un número y un símbolo

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmarPassword } = formData;

    if (!validarEmail(email)) {
      setError("Email no válido.");
      return;
    }

    if (!validarContraseña(password)) {
      setError("La contraseña debe tener al menos 6 caracteres, con letras, números y símbolos.");
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      alert(`✅ Usuario registrado correctamente como ${formData.role}`);
      navigate("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro" noValidate>
      <h2>Registrarse</h2>

      <div className="campo">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-invalid={error && "true"}
          aria-describedby="email-error"
        />
        {error && error.includes("Email") && (
          <p id="email-error" className="error-message">{error}</p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          aria-invalid={error && "true"}
          aria-describedby="password-error"
        />
        {error && error.includes("contraseña") && (
          <p id="password-error" className="error-message">{error}</p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="confirmarPassword">Confirmar contraseña:</label>
        <input
          type="password"
          id="confirmarPassword"
          name="confirmarPassword"
          value={formData.confirmarPassword}
          onChange={handleChange}
          required
          aria-invalid={error && "true"}
          aria-describedby="confirmarPassword-error"
        />
        {error && error.includes("coinciden") && (
          <p id="confirmarPassword-error" className="error-message">{error}</p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="role">Rol:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading}>
        {loading ? <span className="spinner-border"></span> : "Registrarse"}
      </button>
    </form>
  );
}
