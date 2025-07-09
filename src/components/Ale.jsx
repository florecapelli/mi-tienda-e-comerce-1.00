import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Productos.css";
import { dispararSweetBasico } from "../assets/sweetalert.js";
import Card from "./Card"
import Carrito from "./Carrito";  // Si planeas usar el carrito, descomenta esta línea

function ProductosContainer1({ functionCarrito }) {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://68100d8c27f2fdac24101f0a.mockapi.io/productos')
      .then((res) => res.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setError('Hubo un error al cargar los productos.');
        setCargando(false);
      });
  }, []);

  // Muestra un mensaje de carga mientras se obtiene la información
  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  // Muestra el error si ocurre al cargar los productos
  if (error) {
    return <p>{error}</p>;
  }

  // Renderiza los productos una vez que están cargados
  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <Card
          key={producto.id}  // Agregamos el "key" para optimizar el renderizado
          producto={producto}
          functionCarrito={functionCarrito} // Asegúrate de pasar la función correctamente
        />
      ))}
    </div>
  );
}

export default ProductosContainer1;
