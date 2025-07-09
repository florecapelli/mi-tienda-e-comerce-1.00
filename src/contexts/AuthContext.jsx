import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [admin, setAdmin] = useState(false);

  const verificacionLog = () => {
    const storedUser = localStorage.getItem("usuario");
    const storedAdmin = localStorage.getItem("admin");

    if (storedUser) {
      setUsuario(storedUser);
      setAdmin(storedAdmin === "true");
    }
  };

  useEffect(() => {
    verificacionLog();
  }, []);

  const login = (email, password) => {
    if (email === "admin@admin.com" && password === "admin123") {
      setUsuario(email);
      setAdmin(true);
      localStorage.setItem("usuario", email);
      localStorage.setItem("admin", "true");
      return true;
    }

    if (email === "user@user.com" && password === "user123") {
      setUsuario(email);
      setAdmin(false);
      localStorage.setItem("usuario", email);
      localStorage.setItem("admin", "false");
      return true;
    }

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuariosGuardados.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      setUsuario(email);
      setAdmin(usuarioEncontrado.admin || false);
      localStorage.setItem("usuario", email);
      localStorage.setItem("admin", usuarioEncontrado.admin ? "true" : "false");
      return true;
    }

    return false;
  };

  const registrar = (usuario, email, password, esAdmin = false) => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuariosGuardados.find((u) => u.email === email);
    if (existe) return false;

    const nuevoUsuario = { usuario, email, password, admin: esAdmin };
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    return true;
  };

  const logout = () => {
    setUsuario(null);
    setAdmin(false);
    localStorage.removeItem("usuario");
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        admin,
        login,
        logout,
        verificacionLog,
        registrar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
