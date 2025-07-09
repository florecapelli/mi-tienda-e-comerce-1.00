import React from "react";
import { useAdminContext } from "../contexts/AdminContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../styles/Admin.css';

const Admin = () => {
  const { admin, logout } = useAuthContext();
  const navigate = useNavigate();

  const { productos, eliminarProducto, loading, error } = useAdminContext();

  // 🔐 Redirección si no es admin
  if (!admin) return <Navigate to="/login" replace />;

  // 🔄 Cargando
  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // 🧨 Confirmar eliminación
  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(id);
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
      }
    });
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      <h2>Lista de Productos</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={producto.id}>
              <td>{index + 1}</td>
              <td>{producto.name}</td>
              <td>{producto.price} $</td>
              <td>
                <button onClick={() => handleEliminar(producto.id)} className="btn btn-danger btn-sm">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn-salir" onClick={() => {
        logout();
        navigate("/login");
      }}>
        Salir
      </button>
    </div>
  );
};

export default Admin;
