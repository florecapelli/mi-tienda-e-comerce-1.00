import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";

const Tarjeta = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 10px;
  width: 250px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    width: 100%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

const NombreProducto = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Precio = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 16px;
`;

const BotonCompra = styled.button`
  background-color: #ff5733;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c70039;
  }

  &:focus {
    outline: 2px solid #ff5733;
    outline-offset: 4px;
  }
`;

function Producto({ name, price, onComprar }) {
  const precioFormateado = price ? parseFloat(price).toFixed(2) : "0.00";

  return (
    <Tarjeta role="article" aria-labelledby={`producto-${name}`}>
      <NombreProducto id={`producto-${name}`}>{name}</NombreProducto>
      <Precio>${precioFormateado}</Precio>
      <BotonCompra onClick={onComprar} aria-label={`Comprar ${name}`}>
        <FaShoppingCart />
        Comprar
      </BotonCompra>
    </Tarjeta>
  );
}

export default Producto;
