import { FaCartPlus } from "react-icons/fa";
import { Button, Card } from "react-bootstrap";
import "../styles/Productos.css";
import { dispararSweetBasico } from "../assets/sweetalert.js";
import { useCarritoContext } from "../contexts/CarritoContext";

import { Link } from "react-router-dom";

export default function CardProducto({ producto, onAgregarAlCarrito }) {
  const { id, name, price, imagen, description } = producto;

  // Formatear el precio y asegurarse de que es un número
  const precioFormateado = !isNaN(price) ? Number(price).toFixed(2) : "0.00";

  return (
    <Card className="shadow-sm h-100">
      <Link to={`/producto/${id}`} aria-label={`Ver detalles del producto ${name}`}>
        <Card.Img
          variant="top"
          src={imagen}
          alt={name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Imagen+no+válida";
            e.target.alt = `Imagen no válida para el producto ${name}`;
          }}
          style={{ objectFit: "cover", height: "200px" }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate" aria-label={`Nombre del producto: ${name}`}>
          {name}
        </Card.Title>
        <Card.Text
          className="product-description text-muted small"
          aria-label={`Descripción del producto ${name}: ${description}`}
        >
          {description}
        </Card.Text>
        <h5 className="text-success mb-3" aria-label={`Precio del producto ${name}: ${precioFormateado}`}>
          ${precioFormateado}
        </h5>
  <Button
  variant="primary"
  className="mt-auto d-flex align-items-center justify-content-center"
  onClick={() => {
    if (typeof onAgregarAlCarrito === "function") {
      onAgregarAlCarrito(producto);
      dispararSweetBasico("Producto agregado al carrito");
    } else {
      console.warn("onAgregarAlCarrito no es una función");
    }
  }}
  aria-label={`Agregar el producto ${name} al carrito`}
>
  <FaCartPlus className="me-2" />
  Agregar al carrito
</Button>

      </Card.Body>
    </Card>
  );
}
