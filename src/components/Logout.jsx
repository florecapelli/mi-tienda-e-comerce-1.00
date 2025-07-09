// src/components/Logout.jsx
import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { dispararSweetBasico } from "../assets/sweetalert.js";

export default function Logout() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    dispararSweetBasico(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      "warning",
      "Cancelar",
      "Cerrar sesión"
    ).then((result) => {
      if (result.isConfirmed) {
        logout();

        setTimeout(() => {
          navigate("/login");
          dispararSweetBasico("Sesión cerrada", "Has cerrado sesión con éxito", "success");
        }, 200);

      } else {
        setLoading(false);
      }
    });
  };

  return (
    <button
      className="btn btn-danger w-100"
      onClick={handleLogout}
      disabled={loading}
      aria-label="Cerrar sesión"
    >
      {loading ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}
