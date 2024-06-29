import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

function Menu() {
  const { auth, logout } = useContext(AuthContext);
  if (auth.token) {
    //pendiente: &&rol==="ADMIN"
    routes.splice(0, routes.length);
    routes.push({ to: "/", text: "Home" });
    routes.push({ to: "/page1", text: "Pagina 1" });
    routes.push({ to: "/page2", text: "Pagina 2" });
    routes.push({ to: "/cursos", text: "Mis Cursos" });
    routes.push({ to: "/nuevo-coffee", text: "Crear Coffe" });
  }

  const cerrarSession = () => {
    logout();
    routes.splice(0, routes.length);
    routes.push({ to: "/", text: "Home" });
    routes.push({ to: "/page1", text: "Pagina 1" });
    routes.push({ to: "/page2", text: "Pagina 2" });
    routes.push({ to: "/cursos", text: "Mis Cursos" });
    routes.push({ to: "/login", text: "Inicia Sesión" });
  };

  return (
    <>
      <div className="menu">
        <div
          className="menu_header
        "
        >
          <h2>Menu</h2>
          <ul>
            {routes.map((item, index) => (
              <li key={index}>
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "green" : "grey",
                  })}
                  to={item.to}
                >
                  {item.text}
                </NavLink>
              </li>
            ))}
            {auth.token ? <button onClick={cerrarSession}>Salir</button> : ""}
          </ul>
        </div>
      </div>
    </>
  );
}

const routes = [];

routes.push({ to: "/", text: "Home" });
routes.push({ to: "/page1", text: "Pagina 1" });
routes.push({ to: "/page2", text: "Pagina 2" });
routes.push({ to: "/cursos", text: "Mis Cursos" });
routes.push({ to: "/login", text: "Inicia Sesión" });

export { Menu };
