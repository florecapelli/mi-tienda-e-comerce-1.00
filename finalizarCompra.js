import Swal from "sweetalert2";

export const finalizarCompra = async ({
  carrito,
  productos,
  agregarVenta,
  vaciarCarrito,
  navigate,
}) => {
  if (!carrito || carrito.length === 0) return;

  try {
    const sinStock = carrito.filter((prod) => {
      const original = productos.find((p) => p.id.toString() === prod.id.toString());
      return !original || original.stock < prod.cantidad;
    });

    if (sinStock.length > 0) {
      const mensaje = sinStock.map((p) => `- ${p.name}`).join("\n");
      await Swal.fire({
        icon: "error",
        title: "Stock insuficiente",
        html: `No hay suficiente stock para:<br><pre>${mensaje}</pre>`,
      });
      return;
    }

    const total = carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);

    await agregarVenta(carrito);

    await Swal.fire({
      icon: "success",
      title: "¡Gracias por tu compra!",
      text: `Total abonado: $${total.toFixed(2)}`,
      confirmButtonText: "OK",
    });

    vaciarCarrito();
    navigate("/confirmacion");
  } catch (error) {
    console.error("Error al finalizar compra:", error);
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al procesar la compra. Por favor, inténtalo de nuevo.",
      confirmButtonText: "Cerrar",
    });
  }
};

