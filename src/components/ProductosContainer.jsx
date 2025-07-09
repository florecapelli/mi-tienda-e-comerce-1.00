import { useEffect, useState } from "react";
import { useProductosContext } from "../contexts/ProductosContext";
import { Helmet } from "react-helmet";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardProducto from "./Card";
import { FaSearch } from "react-icons/fa";
import { useCarritoContext } from "../contexts/CarritoContext";

function ProductosContainer() {
  const { productos, obtenerProductos, filtrarProductos } = useProductosContext();
  const { agregarAlCarrito } = useCarritoContext();

  const [busqueda, setBusqueda] = useState("");
  const [debouncedBusqueda, setDebouncedBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedBusqueda(busqueda);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [busqueda]);

  useEffect(() => {
    if (debouncedBusqueda) {
      filtrarProductos(debouncedBusqueda);
    } else {
      filtrarProductos("");
    }
  }, [debouncedBusqueda, filtrarProductos]);

  useEffect(() => {
    setPaginaActual(1);
  }, [debouncedBusqueda]);

  useEffect(() => {
    obtenerProductos()
      .then(() => setCargando(false))
      .catch(() => {
        setError('Hubo un problema al cargar los productos.');
        setCargando(false);
      });
  }, [obtenerProductos]);

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const productosActuales = productos.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Helmet>
        <title>Productos | Mi Tienda</title>
        <meta name="description" content="Explora nuestra variedad de productos." />
      </Helmet>
      
      <div className="input-group mb-3 mt-3">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <Row xs={1} md={2} lg={4} className="g-4">
        {productosActuales.length > 0 ? (
          productosActuales.map((producto) => (
            <Col key={producto.id}>
              <CardProducto
                producto={producto}
                onAgregarAlCarrito={() => agregarAlCarrito(producto)}
              />
            </Col>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </Row>

      <div className="d-flex justify-content-center my-4">
        {Array.from({ length: totalPaginas }, (_, index) => (
          <button
            key={index + 1}
            className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => cambiarPagina(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductosContainer;
