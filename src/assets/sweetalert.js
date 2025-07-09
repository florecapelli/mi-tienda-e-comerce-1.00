import Swal from "sweetalert2";

export function dispararSweetBasico(title, text, icon, cancelText = null, confirmText = "Aceptar") {
  const options = {
    title,
    text,
    icon,
    confirmButtonText: confirmText,
  };
  if (cancelText) {
    options.showCancelButton = true;
    options.cancelButtonText = cancelText;
  }
  return Swal.fire(options); // <-- Aquí debe retornar la promesa
}
