import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { Carousel, Container, Spinner } from "react-bootstrap";

function CarruselBootstrap() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        await obtenerProductos();
      } catch (error) {
        setError("Hubo un error al cargar los productos para el carrusel.");
        console.error("Error al cargar productos para el carrusel:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, [obtenerProductos]);

  const primerosTres = productos.slice(0, 3);

  if (cargando) return <Spinner animation="border" variant="primary" />;  // Spinner para carga visual
  if (error) return <p>{error}</p>;
  if (primerosTres.length === 0) return <p>No hay productos para mostrar.</p>;

  return (
  <Container className="my-4">
    {cargando && <Spinner animation="border" variant="primary" />}
    {error && <p>{error}</p>}
    {!cargando && !error && primerosTres.length === 0 && <p>No hay productos para mostrar.</p>}

    {!cargando && !error && primerosTres.length > 0 && (
      <Carousel>
        {primerosTres.map((producto) => (
          <Carousel.Item key={producto.id}>
            <img
              className="d-block w-100"
              src={producto.imagen}
              alt={`Imagen de ${producto.name}`}
              style={{ height: "400px", objectFit: "cover" }}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/800x400?text=Imagen+no+disponible")
              }
            />
            <Carousel.Caption>
              <h3>{producto.name}</h3>
              <p>{producto.description || "Sin descripción disponible"}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    )}
  </Container>
);

}

export default CarruselBootstrap;

