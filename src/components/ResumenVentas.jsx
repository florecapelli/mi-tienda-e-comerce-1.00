import React from "react";
import { useCarritoContext } from "../contexts/CarritoContext";
import { format } from "date-fns"; // Usando date-fns para formatear la fecha

const ResumenVentas = () => {
  const { historialVentas } = useCarritoContext();

  if (!historialVentas || historialVentas.length === 0) {
    return <p className="m-4 alert alert-warning">No hay ventas registradas aún.</p>;
  }

  const totalGeneral = historialVentas.reduce((acc, v) => acc + v.total, 0);

  return (
    <div className="container mt-4">
      <h2>Resumen de Ventas</h2>
      <table className="table table-striped mt-3" role="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {historialVentas.map((venta) => (
            <tr key={venta.id}> {/* Usar un id único para cada venta */}
              <td>{venta.id}</td>
              <td>{venta.nombre}</td>
              <td>{venta.cantidad}</td>
              <td>
                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(venta.total)}
              </td>
              <td>{format(new Date(venta.fecha), 'dd/MM/yyyy HH:mm')}</td> {/* Usando date-fns para formatear la fecha */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total General</strong></td>
            <td><strong>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalGeneral)}</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ResumenVentas;

