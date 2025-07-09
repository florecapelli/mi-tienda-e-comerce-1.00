import { useState } from "react";

export default function Login({ user, admin, setLogeadoUser, setLogeadoAdmin }) {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState(""); // Para manejar errores de login

  // Alterna estado login usuario normal
  const handleLoginUser = () => {
    setLogeadoUser(user ? null : true);
  };

  // Alterna estado login administrador
  const handleLoginAdmin = () => {
    setLogeadoAdmin(admin ? null : true);
  };

  // Simulación login con Google
  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setError(""); // Limpiar errores previos
    try {
      const result = await logearG(); // Asegúrate de definir esta función
      console.log("Google login exitoso:", result.user);
      // Aquí actualiza el estado global o local con la info del usuario de Google
    } catch (error) {
      console.error("Error en login con Google:", error.message);
      setError("Error al iniciar sesión con Google: " + error.message);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      {error && (
        <div className="error-message text-red-600 font-bold mb-4" role="alert">
          {error}
        </div>
      )}

      <button
        onClick={handleLoginUser}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-pressed={!!user}
        aria-label={user ? "Cerrar sesión de usuario" : "Iniciar sesión de usuario"}
      >
        {user ? "Cerrar sesión Usuario" : "Iniciar sesión Usuario"}
      </button>

      <button
        onClick={handleLoginAdmin}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        aria-pressed={!!admin}
        aria-label={admin ? "Cerrar sesión de administrador" : "Iniciar sesión de administrador"}
      >
        {admin ? "Cerrar sesión Admin" : "Iniciar sesión Admin"}
      </button>

      <button
        onClick={handleGoogleLogin}
        disabled={loadingGoogle}
        className={`px-4 py-2 rounded text-white ${
          loadingGoogle
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        }`}
        aria-busy={loadingGoogle}
        aria-label="Iniciar sesión con Google"
      >
        {loadingGoogle ? (
          <span>🔄 Cargando...</span>
        ) : (
          "Iniciar sesión con Google"
        )}
      </button>
    </div>
  );
}
