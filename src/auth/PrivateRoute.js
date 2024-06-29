import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  return auth.token ? (
    children
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ path: location.pathname }}
    ></Navigate>
  );
}

export { PrivateRoute };
