import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ConfirmacionCompra() {
  const [numeroOrden, setNumeroOrden] = useState("");

  useEffect(() => {
    const generarNumeroOrden = () => {
      const numero = Math.floor(100000 + Math.random() * 900000);
      setNumeroOrden(numero);
    };
    generarNumeroOrden();
  }, []);

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        textAlign: "center",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: 12,
        backgroundColor: "#f9f9f9",
        fontFamily: "'Segoe UI', sans-serif",
      }}
      role="document"  // Mejorar la accesibilidad
      aria-live="assertive"  // Hacer que el mensaje se lea de inmediato
    >
      <h2 style={{ color: "#28a745", fontSize: "2rem", marginBottom: "1rem" }}>
        ¡Gracias por tu compra!
      </h2>

      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
        Tu pedido fue procesado correctamente.
      </p>

      <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        Número de orden:{" "}
        <span aria-live="polite" aria-label={`Número de orden ${numeroOrden}`}>
          #{numeroOrden}
        </span>
      </p>

      <Link to="/productos" aria-label="Seguir comprando productos">
        <button
          type="button"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            fontSize: "1rem",
            borderRadius: 6,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          Seguir comprando
        </button>
      </Link>
    </main>
  );
}

