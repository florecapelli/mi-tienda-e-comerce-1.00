import React, { useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "4px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outlineOffset: "2px",
  transition: "border-color 0.3s ease",
};

const btnStyleBase = {
  padding: "12px",
  backgroundColor: "#0066cc",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "1.1rem",
  fontWeight: "600",
  transition: "background-color 0.3s ease",
};

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [hover, setHover] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log({ nombre, email, mensaje });
    setEnviado(true);
    setTimeout(() => setEnviado(false), 5000); // Mostrar el mensaje por 5 segundos
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  const btnStyle = {
    ...btnStyleBase,
    backgroundColor: hover ? "#004a99" : "#0066cc",
    cursor: !nombre || !email || !mensaje ? "not-allowed" : "pointer",
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: 600,
        margin: "2rem auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#0077cc", marginBottom: "1rem" }}>
        Contáctanos
      </h2>

      <form
        onSubmit={manejarEnvio}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        noValidate
      >
        <label htmlFor="nombre" style={{ fontWeight: "bold" }}>
          Nombre:
          <input
            type="text"
            name="nombre"
            id="nombre"  // Añadido id
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="name"
            aria-label="Nombre"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#0077cc")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </label>

        <label htmlFor="email" style={{ fontWeight: "bold" }}>
          Email:
          <input
            type="email"
            name="email"
            id="email"  // Añadido id
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-label="Correo electrónico"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#0077cc")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </label>

        <label htmlFor="mensaje" style={{ fontWeight: "bold" }}>
          Mensaje:
          <textarea
            name="mensaje"
            id="mensaje"  // Añadido id
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            rows="5"
            aria-label="Mensaje"
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "#0077cc")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </label>

        <button
          type="submit"
          style={btnStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          disabled={!nombre || !email || !mensaje}
          aria-disabled={!nombre || !email || !mensaje}
        >
          Enviar
        </button>
      </form>

      {enviado && (
        <p
          role="alert"
          aria-live="assertive"  // Para que el mensaje se lea rápidamente
          style={{
            marginTop: "1rem",
            color: "green",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          ✅ ¡Mensaje enviado correctamente!
        </p>
      )}
    </div>
  );
}

export default Contacto;
