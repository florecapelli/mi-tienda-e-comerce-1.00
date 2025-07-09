// src/contexts/ProductosContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  // ✅ Obtener todos los productos (con control de duplicados)
  const obtenerProductos = async () => {
    if (productos.length > 0) return productos;

    try {
      const respuesta = await fetch('https://68100d8c27f2fdac24101f0a.mockapi.io/productos');
      if (!respuesta.ok) throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);

      const datos = await respuesta.json();
      setProductos(datos);
      setProductosOriginales(datos);
      return datos;
    } catch (error) {
      console.error('Error al obtener productos:', error.message);
      throw error;
    }
  };

  // ✅ Agregar un producto nuevo
  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch('https://68100d8c27f2fdac24101f0a.mockapi.io/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto.');

      const nuevoProducto = await respuesta.json();
      // Opcional: actualizamos el estado local
      setProductos((prev) => [...prev, nuevoProducto]);
      setProductosOriginales((prev) => [...prev, nuevoProducto]);
      return nuevoProducto;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // ✅ Obtener un producto por ID
  const obtenerProducto = async (id) => {
    try {
      const respuesta = await fetch(`https://68100d8c27f2fdac24101f0a.mockapi.io/productos/${id}`);
      if (!respuesta.ok) throw new Error('Producto no encontrado');

      const producto = await respuesta.json();
      setProductoEncontrado(producto);
      return producto;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // ✅ Editar un producto existente
  const editarProducto = async (producto) => {
    try {
      const respuesta = await fetch(
        `https://68100d8c27f2fdac24101f0a.mockapi.io/productos/${producto.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(producto),
        }
      );

      if (!respuesta.ok) throw new Error('Error al actualizar el producto.');

      const actualizado = await respuesta.json();
      setProductos((prev) =>
        prev.map((p) => (p.id === producto.id ? actualizado : p))
      );
      setProductosOriginales((prev) =>
        prev.map((p) => (p.id === producto.id ? actualizado : p))
      );
      return actualizado;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // ✅ Eliminar un producto por ID
  const eliminarProducto = async (id) => {
    try {
      const respuesta = await fetch(`https://68100d8c27f2fdac24101f0a.mockapi.io/productos/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) throw new Error('Error al eliminar');

      setProductos((prev) => prev.filter((producto) => producto.id !== id));
      setProductosOriginales((prev) => prev.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // ✅ Filtrar productos por nombre
  const filtrarProductos = (filtro) => {
    if (filtro.length === 0) {
      setProductos(productosOriginales);
      return;
    }

    const filtrados = productosOriginales.filter((producto) =>
      producto.name.toLowerCase().includes(filtro.toLowerCase())
    );
    setProductos(filtrados);
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        productoEncontrado,
        obtenerProductos,
        agregarProducto,
        obtenerProducto,
        editarProducto,
        eliminarProducto,
        filtrarProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductosContext = () => useContext(ProductosContext);
