import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dispararSweetBasico } from "../assets/sweetalert.js";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import "../styles/FormularioEdicion.css";

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        await obtenerProducto(id);
        setProducto(productoEncontrado);
        setCargando(false);
      } catch (error) {
        setError(error.message || "Hubo un error al obtener el producto.");
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id, obtenerProducto, productoEncontrado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.imagen.trim()) {
      return "La url de la imagen no debe estar vacía.";
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validacion = validarFormulario();
    if (validacion === true) {
      try {
        await editarProducto(producto);
        toast.success("Producto editado correctamente!");
        navigate("/productos");  // Redirigir a la lista de productos
      } catch (error) {
        toast.error("Hubo un problema al actualizar el producto. " + error.message);
      }
    } else {
      dispararSweetBasico("Error en la carga de producto", validacion, "error", "Cerrar");
    }
  };

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={producto.name || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>URL de la Imagen</label>
        <input
          type="text"
          name="imagen"
          value={producto.imagen || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={producto.price || ''}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={producto.description || ''}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Actualizar Producto</button>
      <ToastContainer />
    </form>
  );
}

export default FormularioEdicion;
