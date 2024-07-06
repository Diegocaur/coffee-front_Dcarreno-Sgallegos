import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  // Verifica si el usuario esta autenticado y si su rol es "ADMIN"
  const isAuthenticated = auth.token ? true : false;
  const isAdmin = auth.rol && auth.rol.includes("ADMIN");

  return isAuthenticated && isAdmin ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location.pathname }} />
  );
}

export { PrivateRoute };
