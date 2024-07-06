import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

// Componente contenedor
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ token: null, rol: null, sub: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decodificar el token para obtener información adicional
      const decodedToken = jwtDecode(token);
      const { rol } = decodedToken;
      const {sub} = decodedToken // Suponiendo que el token contiene un campo 'role'
      
      setAuth({ token, rol, sub });
    }
  }, []);

  const setToken = async (token) => {
    // Guardar el token en localStorage
    localStorage.setItem("token", token);
    
    // Decodificar el token para obtener información adicional
    const decodedToken = jwtDecode(token);
    const { rol } = decodedToken;
    const {sub} = decodedToken // Suponiendo que el token contiene un campo 'role'
    
    setAuth({ token, rol,sub });
  };

  const logout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem("token");
    setAuth({ token: null, role: null, sub: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
