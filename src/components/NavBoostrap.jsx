// src/components/NavBoostrap.jsx
import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/NavBoostrap.css";
import Logout from "./Logout"; // <-- Importamos el botón logout

const NavBoostrap = () => {
  const { productosCarrito } = useCarritoContext();
  const { usuario, admin } = useAuthContext();

  const [busqueda, setBusqueda] = useState("");

  const manejarBusqueda = (e) => {
    e.preventDefault();
    alert("Buscar: " + busqueda);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mi Tienda
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navegación principal */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/productos">
              Productos
            </Nav.Link>
            {admin && (
              <Nav.Link as={Link} to="/admin/panel">
                Panel Admin
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/nosotros">
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>

          {/* Buscador */}
          <Form className="d-flex me-3" onSubmit={manejarBusqueda}>
            <FormControl
              type="search"
              placeholder="Buscar productos"
              className="me-2"
              aria-label="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              Buscar
            </Button>
          </Form>

          {/* Carrito y usuario */}
          <Nav className="align-items-center">
       <Nav.Link
  as={Link}
  to="/carrito"
  className="d-flex align-items-center position-relative"
>
  <FaShoppingCart size={20} />
  <span
    style={{
      position: "absolute",
      top: "0",
      right: "0",
      background: "red",
      borderRadius: "50%",
      color: "white",
      padding: "2px 6px",
      fontSize: "12px",
      fontWeight: "bold",
      display: productosCarrito.length > 0 ? "inline" : "none",
    }}
  >
    {productosCarrito.length}
  </span>
</Nav.Link>


            {usuario ? (
              <NavDropdown
                title={
                  <span
                    style={{ color: "white", display: "flex", alignItems: "center" }}
                  >
                    <FaUser style={{ marginRight: "5px" }} />
                    {usuario}
                  </span>
                }
                id="nav-dropdown"
                align="end"
              >
                {/* Aquí el botón Logout dentro del dropdown */}
                <NavDropdown.Item as="div">
                  <Logout />
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/registro">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBoostrap;
