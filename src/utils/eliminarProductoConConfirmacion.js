// src/utils/eliminarProductoConConfirmacion.js

import Swal from 'sweetalert2';

export const dispararSweetBasico = (titulo, mensaje, icono, textoBoton) => {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
    confirmButtonText: textoBoton
  });
};
