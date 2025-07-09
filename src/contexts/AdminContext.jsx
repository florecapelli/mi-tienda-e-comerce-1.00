// src/contexts/AdminContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { obtenerProductos, agregarProducto, editarProducto, eliminarProducto } from "../api/productosApi"; // Ajusta la ruta

// Crear el contexto
export const AdminContext = createContext();

// Proveedor del contexto
export function AdminProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos desde MockAPI
  const cargarProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (err) {
      setError(err.message || "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // Agregar producto
  const agregarProductoAdmin = async (producto) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoProducto = await agregarProducto(producto);
      setProductos((prev) => [...prev, nuevoProducto]);
      return nuevoProducto;
    } catch (err) {
      setError(err.message || "Error al agregar producto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Editar producto
  const editarProductoAdmin = async (producto) => {
    setLoading(true);
    setError(null);
    try {
      const actualizado = await editarProducto(producto.id, producto);
      setProductos((prev) =>
        prev.map((p) => (p.id === actualizado.id ? actualizado : p))
      );
      return actualizado;
    } catch (err) {
      setError(err.message || "Error al editar producto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const eliminarProductoAdmin = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await eliminarProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || "Error al eliminar producto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Agregar venta
  const agregarVenta = (carrito) => {
    setVentas((prev) => [...prev, { id: Date.now(), carrito, fecha: new Date() }]);
  };

  return (
    <AdminContext.Provider
      value={{
        productos,
        ventas,
        loading,
        error,
        cargarProductos,
        agregarProducto: agregarProductoAdmin,
        editarProducto: editarProductoAdmin,
        eliminarProducto: eliminarProductoAdmin,
        agregarVenta,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// Hook para consumir el contexto
export const useAdminContext = () => useContext(AdminContext);
