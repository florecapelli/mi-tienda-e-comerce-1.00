import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useCarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { dispararSweetBasico } from "../assets/sweetalert.js";

function ProductoDetalle() {
  const navegar = useNavigate();
  const { role } = useAuthContext();
  const isAdmin = role === "admin";

  const { agregarAlCarrito } = useCarritoContext();
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();
  const { id } = useParams();

  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        await obtenerProducto(id);
        setCargando(false);
      } catch (err) {
        setError(err.message || "Hubo un error al obtener el producto.");
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id, obtenerProducto]);

  const { name, description, price, stock, imagen } = productoEncontrado || {};

  const funcionCarrito = () => {
    if (cantidad < 1) {
      dispararSweetBasico(
        "Cantidad inválida",
        "La cantidad debe ser mayor que 0",
        "warning",
        "Cerrar"
      );
      return;
    }
    if (cantidad > (stock || 0)) {
      dispararSweetBasico(
        "Stock insuficiente",
        `Solo quedan ${stock} unidades disponibles`,
        "warning",
        "Cerrar"
      );
      return;
    }
    agregarAlCarrito({ ...productoEncontrado, cantidad });
    dispararSweetBasico(
      "Producto Agregado",
      "El producto fue agregado al carrito con éxito",
      "success",
      "Cerrar"
    );
  };

  const dispararEliminar = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      eliminarProducto(id)
        .then(() => navegar("/productos"))
        .catch((error) =>
          dispararSweetBasico(
            "Hubo un problema al eliminar el producto",
            error.message,
            "error",
            "Cerrar"
          )
        );
    }
  };

  const sumarContador = () => {
    if (cantidad < (stock || 0)) setCantidad(cantidad + 1);
  };

  const restarContador = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return <p>Producto no encontrado.</p>;

  return (
    <div className="detalle-container">
      <img
        className="detalle-imagen"
        src={imagen}
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x300?text=Sin+imagen";
        }}
      />
      <div className="detalle-info">
        <h2>{name}</h2>
        <p>{description}</p>
        <h5>
          {price && !isNaN(price)
            ? `$${Number(price).toFixed(2)}`
            : "Precio no disponible"}
        </h5>

        {stock === 0 && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Producto sin stock disponible
          </p>
        )}

        <div className="detalle-contador" aria-label="Selector de cantidad">
          <button
            onClick={restarContador}
            aria-label="Disminuir cantidad"
            aria-disabled={cantidad <= 1}
            disabled={cantidad <= 1}
          >
            -
          </button>
          <span aria-live="polite" aria-atomic="true" style={{ margin: "0 10px" }}>
            {cantidad}
          </span>
          <button
            onClick={sumarContador}
            aria-label="Aumentar cantidad"
            aria-disabled={cantidad >= stock}
            disabled={cantidad >= stock}
          >
            +
          </button>
        </div>

        {isAdmin ? (
          <>
            <Link to={`/admin/editarProducto/${id}`}>
              <Button>Editar Producto</Button>
            </Link>
            <Button variant="danger" onClick={dispararEliminar} className="ms-2">
              Eliminar Producto
            </Button>
          </>
        ) : (
          <Button
            onClick={funcionCarrito}
            disabled={stock === 0}
            aria-disabled={stock === 0}
            className="mt-3"
          >
            {stock === 0 ? "Sin stock" : "Agregar al carrito"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductoDetalle;
