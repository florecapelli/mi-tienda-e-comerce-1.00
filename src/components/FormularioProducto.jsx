import React, { useState } from "react";
import { dispararSweetBasico } from "../assets/sweetalert.js";

const agregarProducto = async (producto) => {
  try {
    const response = await fetch("https://68100d8c27f2fdac24101f0a.mockapi.io/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Producto agregado:", data);
    dispararSweetBasico("Producto Agregado", "El producto se ha agregado con éxito.", "success", "Cerrar");
  } catch (error) {
    console.error("Hubo un problema:", error);
    dispararSweetBasico("Error", error.message || "Error desconocido", "error", "Cerrar");
  }
};

const FormularioProducto = () => {
  const [producto, setProducto] = useState({
    name: "",
    price: "",
    description: "",
    imagen: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    let valid = true;
    const newErrors = { name: "", price: "", description: "", imagen: "" };

    if (!producto.name.trim()) {
      valid = false;
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!producto.price || parseFloat(producto.price) <= 0) {
      valid = false;
      newErrors.price = "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      valid = false;
      newErrors.description = "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.imagen.trim()) {
      valid = false;
      newErrors.imagen = "La URL de la imagen no debe estar vacía.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validarFormulario();
    if (isValid) {
      await agregarProducto(producto);
      setProducto({ name: "", price: "", description: "", imagen: "" });
      setErrors({ name: "", price: "", description: "", imagen: "" });
    } else {
      dispararSweetBasico("Error en la carga de producto", "Verifica los errores", "error", "Cerrar");
    }
  };

  return (
    <form className="formulario-producto" onSubmit={handleSubmit} noValidate>
      <h2>Agregar Producto</h2>

      <div className="campo">
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={producto.name}
          onChange={handleChange}
          className={errors.name ? "input-error" : ""}
          required
          aria-describedby="error-name"
        />
        {errors.name && <span id="error-name" className="error-message">{errors.name}</span>}
      </div>

      <div className="campo">
        <label htmlFor="imagen">URL de la Imagen:</label>
        <input
          id="imagen"
          type="text"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          className={errors.imagen ? "input-error" : ""}
          required
          aria-describedby="error-imagen"
        />
        {errors.imagen && <span id="error-imagen" className="error-message">{errors.imagen}</span>}
      </div>

      <div className="campo">
        <label htmlFor="price">Precio:</label>
        <input
          id="price"
          type="number"
          name="price"
          value={producto.price}
          onChange={handleChange}
          className={errors.price ? "input-error" : ""}
          required
          min="0"
          aria-describedby="error-price"
        />
        {errors.price && <span id="error-price" className="error-message">{errors.price}</span>}
      </div>

      <div className="campo">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={producto.description}
          onChange={handleChange}
          className={errors.description ? "input-error" : ""}
          required
          aria-describedby="error-description"
        />
        {errors.description && <span id="error-description" className="error-message">{errors.description}</span>}
      </div>

      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default FormularioProducto;

