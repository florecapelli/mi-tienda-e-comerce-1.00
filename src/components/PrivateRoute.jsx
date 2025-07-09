import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Spinner } from "react-bootstrap"; // O tu propia animación de carga

export default function PrivateRoute({ roleRequired }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    // Mostrar un spinner o algo visual mientras se carga la autenticación
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }

  if (!user) {
    // Si no hay usuario, redirigir al login
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && (!user.role || user.role !== roleRequired)) {
    // Si el rol no coincide, redirigir a la página de no autorizado
    return <Navigate to="/no-autorizado" replace />;
  }

  return <Outlet />; // El componente se renderiza si pasa todas las validaciones
}

