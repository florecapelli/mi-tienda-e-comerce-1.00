import { createContext, useState, useContext } from 'react';

export const CarritoContext = createContext();

export const useCarritoContext = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [productosCarrito, setProductosCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setProductosCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        // Si ya existe, actualizamos la cantidad
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p
        );
      } else {
        // Si no existe, agregamos con cantidad
        return [...prev, { ...producto, cantidad }];
      }
    });
  };

  // Eliminar producto por id
  const borrarProductoCarrito = (id) => {
    setProductosCarrito(prev => prev.filter(p => p.id !== id));
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{
      productosCarrito,
      agregarAlCarrito,
      borrarProductoCarrito,
      vaciarCarrito,
    }}>
      {children}
    </CarritoContext.Provider>
  );
};
