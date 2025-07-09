import React, { useEffect } from "react";

function MiComponente() {
  useEffect(() => {
    const handleResize = () => {
      console.log("Ventana redimensionada");
    };

    // Suscribir al evento de redimensionamiento
    window.addEventListener("resize", handleResize);

    return () => {
      // Limpiar el evento cuando el componente se desmonta
      window.removeEventListener("resize", handleResize);
      console.log("componente desmontado");
    };
  }, []); // Array vacío: solo se ejecuta al montar y desmontar

  return <div>Hola, este es mi componente</div>;
}

export default MiComponente;
