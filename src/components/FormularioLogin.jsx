import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormularioLogin.css";

export default function FormularioLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Manejo de cambio de entradas de forma genérica
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  // Validación de email usando expresión regular básica
  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Simulación de login
  const simularLogin = (email, password) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@admin.com" && password === "1234") resolve("admin");
        else if (email === "user@user.com" && password === "1234") resolve("user");
        else reject(new Error("Email o contraseña incorrectos"));
      }, 1000);
    });

  // Manejador de submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del formulario
    if (!validarEmail(formData.email)) return setError("Por favor, ingresa un email válido");
    if (!formData.password.trim()) return setError("La contraseña no puede estar vacía");

    setLoading(true);
    try {
      const rol = await simularLogin(formData.email, formData.password);
      alert(rol === "admin" ? "Bienvenido, Admin" : "Bienvenido, Usuario");
      navigate(rol === "admin" ? "/admin" : "/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Iniciar sesión</h2>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
        aria-invalid={error && !validarEmail(formData.email)}  // Marca como inválido si hay error en el email
      />
      {error && !validarEmail(formData.email) && <p className="error" role="alert" aria-live="assertive">{error}</p>}

      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {error && formData.password.trim() === "" && <p className="error" role="alert" aria-live="assertive">{error}</p>}

      <button type="submit" disabled={loading} aria-busy={loading}>
        {loading ? "Iniciando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
