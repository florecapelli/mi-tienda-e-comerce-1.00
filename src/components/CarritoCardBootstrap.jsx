import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

function CarritoCardBootstrap({ producto, onRemove, onAgregarCantidad }) {
  return (
    <Card className="mb-3" role="region" aria-label={`Producto ${producto.name} en carrito`}>
      <Card.Body>
        <Row className="align-items-center">
          <Col md={3}>
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt={producto.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/100x100?text=Sin+imagen";
              }}
              style={{ maxHeight: "100px", objectFit: "cover", width: "100%" }}
            />
          </Col>
          <Col md={3}>
            <Card.Title>{producto.name}</Card.Title>
            <Card.Text className="text-muted">{producto.description}</Card.Text>
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <span aria-label={`Cantidad actual de ${producto.name}`}>Cant: {producto.cantidad}</span>
            <Button
              variant="success"
              size="sm"
              className="ms-2"
              aria-label={`Agregar una unidad más de ${producto.name}`}
              onClick={() => onAgregarCantidad(producto.id)}
            >
              +
            </Button>
          </Col>
          <Col md={2}>
            <span aria-label={`Precio unitario de ${producto.name}`}>
              Precio: ${Number(producto.price).toFixed(2)}
            </span>
          </Col>
          <Col md={2}>
            <span aria-label={`Subtotal de ${producto.name}`}>
              Subtotal: ${(producto.cantidad * producto.price).toFixed(2)} $
            </span>
          </Col>
          <Col md={1}>
            <Button
              variant="danger"
              aria-label={`Eliminar ${producto.name} del carrito`}
              onClick={() => onRemove(producto.id)}
            >
              X
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CarritoCardBootstrap;

