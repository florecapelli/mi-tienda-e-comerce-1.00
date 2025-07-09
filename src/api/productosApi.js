// src/api/productosApi.js
const API_BASE = "https://68100d8c27f2fdac24101f0a.mockapi.io";

export const obtenerProductos = async () => {
  try {
    const response = await fetch(`${API_BASE}/productos`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const agregarProducto = async (producto) => {
  try {
    const response = await fetch(`${API_BASE}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const editarProducto = async (id, producto) => {
  try {
    const response = await fetch(`${API_BASE}/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/productos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return true;
  } catch (error) {
    console.error(error);
  }
};
