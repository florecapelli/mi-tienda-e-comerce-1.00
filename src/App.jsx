// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./layouts/Layout";
import { useAuthContext } from "./contexts/AuthContext";

import Home from "./layouts/Home";
import ProductosContainer from "./components/ProductosContainer";
import ProductoDetalle from "./components/ProductoDetalle";
import CarritoBootstrap from "./components/CarritoBootstrap";
import About from "./components/About";
import Contacto from "./components/Contacto";
import LoginBoost from "./components/LoginBoost";
import Registro from "./components/Registro";
import Admin from "./components/Admin";
import PanelAdmin from "./components/PanelAdmin";
import FormularioProducto from "./components/FormularioProducto";
import FormularioEdicion from "./components/FormularioEdicion";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { verificacionLog } = useAuthContext();

  useEffect(() => {
    verificacionLog();
  }, [verificacionLog]);

  return (
    <HelmetProvider>
      <Layout>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginBoost />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/productos" element={<ProductosContainer />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <CarritoBootstrap />
              </ProtectedRoute>
            }
          />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Rutas protegidas para administradores */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/panel"
            element={
              <ProtectedRoute adminOnly={true}>
                <PanelAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/agregarProductos"
            element={
              <ProtectedRoute adminOnly={true}>
                <FormularioProducto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/editarProducto/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <FormularioEdicion />
              </ProtectedRoute>
            }
          />

          {/* Ruta 404 */}
          <Route
            path="*"
            element={
              <h2 style={{ padding: "2rem", textAlign: "center" }}>
                404 - Página no encontrada
              </h2>
            }
          />
        </Routes>
      </Layout>
    </HelmetProvider>
  );
}

export default App;
