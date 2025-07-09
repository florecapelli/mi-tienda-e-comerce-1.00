import "../styles/Carrito.css";
import { useContext, useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";  // Asegúrate de que el nombre coincida

import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Carrito() {
  const { user } = useAuthContext();
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);

  const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + (producto.price * producto.cantidad || 0),
    0
  );

  // Funciones de disparo para borrar producto o vaciar carrito
  const handleBorrarProducto = (id) => borrarProductoCarrito(id);
  const handleVaciarCarrito = () => vaciarCarrito();

  // Verificación si el usuario no está logueado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="carrito-conteiner">
      <button
        onClick={handleVaciarCarrito}
        aria-label="Vaciar carrito"
        className="vaciar-carrito-btn"
      >
        Vaciar carrito
      </button>

      <div className="carrito-titulos">
        <h2 className="carrito-titulo-producto">Producto</h2>
        <h2 className="carrito-titulo-descripcion">Descripción</h2>
        <h2></h2>
        <h2>Cantidad</h2>
        <h2>Precio unitario</h2>
        <h2>Sub total</h2>
        <h2></h2>
      </div>

      {productosCarrito.length > 0 ? (
        productosCarrito.map((producto) => (
          <CarritoCard
            key={producto.id}
            producto={producto}
            funcionDisparadora={handleBorrarProducto}
          />
        ))
      ) : (
        <p>Carrito vacío</p>
      )}

      {total > 0 && (
        <div className="total-carrito">
          <span className="total-texto">Total a pagar:</span>
          <span className="total-cantidad">${total.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}
