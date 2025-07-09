// src/layouts/Layout.jsx
import React from "react";
import NavBoostrap from "../components/NavBoostrap";

const Layout = ({ children }) => {
  return (
    <>
      <NavBoostrap />
      <main style={{ padding: "20px", minHeight: "80vh", backgroundColor: "#f8f9fa" }}>
        {children}
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
          marginTop: "auto",
        }}
      >
        © 2025 Mi Tienda - Todos los derechos reservados
      </footer>
    </>
  );
};

export default Layout;
