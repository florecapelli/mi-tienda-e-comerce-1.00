import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Container, Modal } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/CarritoBootstrap.css";

import CarritoCardBootstrap from "../components/CarritoCardBootstrap";

function CarritoBootstrap() {
  const { usuario } = useAuthContext();
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito, agregarAlCarrito } = useContext(CarritoContext);
  const [showResumen, setShowResumen] = useState(false);
  const navigate = useNavigate();

  const total = productosCarrito.reduce(
    (subTotal, { price, cantidad }) => subTotal + price * cantidad,
    0
  );

  const totalFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(total);

  const handleRemoveProduct = (id) => borrarProductoCarrito(id);

  // Aquí aumentamos cantidad sumando 1 al producto del carrito
  const handleAgregarCantidad = (id) => {
    const producto = productosCarrito.find((p) => p.id === id);
    if (producto) {
      agregarAlCarrito(producto, 1);
    }
  };

  const handleEmptyCart = () => {
    if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      vaciarCarrito();
    }
  };

  const handleFinalizarCompra = () => {
    setShowResumen(true);
  };

  const handleConfirmarCompra = () => {
    alert("¡Compra realizada con éxito! Gracias por tu compra.");
    vaciarCarrito();
    setShowResumen(false);
  };

  if (!usuario) return <Navigate to="/login" replace />;

  return (
    <Container className="my-4">
      <h2 className="mb-3">Carrito de compras</h2>

      {/* Botón para volver a productos */}
      <Button variant="secondary" className="mb-3" onClick={() => navigate("/productos")}>
        ← Volver a productos
      </Button>

      <Button
        variant="danger"
        className="mb-4 me-2"
        onClick={handleEmptyCart}
        aria-label="Vaciar carrito"
      >
        Vaciar carrito
      </Button>

      {productosCarrito.length > 0 && (
        <Button
          variant="success"
          className="mb-4"
          onClick={handleFinalizarCompra}
        >
          Finalizar compra
        </Button>
      )}

      {productosCarrito.length > 0 ? (
        productosCarrito.map((producto) => (
          <CarritoCardBootstrap
            key={producto.id}
            producto={producto}
            onRemove={handleRemoveProduct}
            onAgregarCantidad={handleAgregarCantidad}  // <-- pasamos esta prop
          />
        ))
      ) : (
        <p>Carrito vacío</p>
      )}

      {total > 0 && (
        <h4 className="mt-4 text-end">
          Total a pagar: <strong>{totalFormateado}</strong>
        </h4>
      )}

      {/* Modal Resumen de compra */}
      <Modal show={showResumen} onHide={() => setShowResumen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resumen de tu compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productosCarrito.map((p) => (
            <div key={p.id}>
              <p>
                <strong>{p.name}</strong> x {p.cantidad} = $
                {p.price * p.cantidad}
              </p>
            </div>
          ))}
          <hr />
          <p className="text-end">
            <strong>Total: {totalFormateado}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResumen(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleConfirmarCompra}>
            Confirmar compra
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CarritoBootstrap;



