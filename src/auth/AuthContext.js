import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

//componente contenedor
export function AuthProvider({ children }) {
  const [auth, sethAuth] = useState({ token: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      sethAuth({ token: token });
    }
  }, []);

  const setToken = async (token) => {
    localStorage.setItem("token", token);
    sethAuth({ token: token });
  };

  //cerrar sesion
  const logout = () => {
    localStorage.removeItem("token");
    sethAuth({ token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
