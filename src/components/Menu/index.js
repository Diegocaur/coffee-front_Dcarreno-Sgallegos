import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

function Menu() {
  const { auth, logout } = useContext(AuthContext);

  if (auth.token) {
    //pendiente: &&rol==="ADMIN"
    if(auth.rol[0] === "ADMIN"){
      routes.splice(0, routes.length);
      routes.push({ to: "/", text: "Home" });
      routes.push({ to: "/cafes", text: "Cafes" });
      routes.push({ to: "/vercoffees", text: "Mis coffees" });
      routes.push({ to: "/verclientes", text: "Mis clientes" });
      routes.push({ to: "/nuevo-coffee", text: "Crear Coffe" });
    }

    if(auth.rol[0] === "CLIENT"){
          routes.splice(0, routes.length);
          routes.push({ to: "/", text: "Home" });
          routes.push({ to: "/cafes", text: "Cafes" });
          routes.push({ to: "/cursos", text: "Mis Cursos" });
    }
    /*

    */
  }

  const cerrarSession = () => {
    logout();
    routes.splice(0, routes.length);
    routes.push({ to: "/", text: "Home" });
    routes.push({ to: "/coffes", text: "Cafes" });
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
          <div className="nombre_logo">
            <h2>Cafeteria</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-coffee"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#7f5345"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
              <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
              <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
              <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" />
              <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
            </svg>
          </div>
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
routes.push({ to: "/cafes", text: "Cafes" });
routes.push({ to: "/page2", text: "Pagina 2" });
routes.push({ to: "/cursos", text: "Mis Cursos" });
routes.push({ to: "/login", text: "Inicia Sesión" });

export { Menu };
