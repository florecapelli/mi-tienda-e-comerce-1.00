// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { usuario, admin } = useAuthContext();

  // Si no hay usuario logueado, redirigir a login
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // Si se requiere ser admin y no lo es, redirigir a inicio
  if (adminOnly && !admin) {
    return <Navigate to="/" />;
  }

  // Si pasa todas las validaciones, renderiza los hijos
  return children;
}

export default ProtectedRoute;

