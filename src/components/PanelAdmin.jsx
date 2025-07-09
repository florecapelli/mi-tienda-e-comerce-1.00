import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PanelAdmin = () => {
  const navigate = useNavigate();

  const borrarAdmin = () => {
    // Eliminar admin mal registrado
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosFiltrados = usuarios.filter(u => u.email !== "admin@admin.com");
    localStorage.setItem("usuarios", JSON.stringify(usuariosFiltrados));

    // Limpiar sesión actual
    localStorage.removeItem("usuario");
    localStorage.removeItem("admin");

    alert("Usuario admin eliminado y sesión cerrada.");
    navigate("/login"); // Redirigir al login después
  };

  return (
    <div className="container mt-5">
      <h2>Panel de Administrador</h2>
      <p>Bienvenido al panel de control. Seleccioná una opción:</p>

      <button 
        onClick={borrarAdmin} 
        className="btn btn-danger mb-4"
        aria-label="Borrar usuario admin incorrecto y cerrar sesión"
      >
        🗑️ Borrar usuario admin incorrecto y cerrar sesión
      </button>

      <div className="list-group mt-4" role="navigation" aria-label="Opciones de administración">
        <Link 
          to="/admin" 
          className="list-group-item list-group-item-action"
          aria-label="Ver productos"
        >
          📦 Ver Productos
        </Link>
        <Link 
          to="/admin/agregarProductos" 
          className="list-group-item list-group-item-action"
          aria-label="Agregar producto"
        >
          ➕ Agregar Producto
        </Link>
        <Link 
          to="/admin/ventas" 
          className="list-group-item list-group-item-action"
          aria-label="Ver resumen de ventas"
        >
          📊 Resumen de Ventas
        </Link>
      </div>
    </div>
  );
};

export default PanelAdmin;
