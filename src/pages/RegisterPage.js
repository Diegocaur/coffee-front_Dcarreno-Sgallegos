import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";
import { NavLink } from "react-router-dom";
import "../styles/loginPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);

  const login = async () => {
    const resp = await loginAccount({ username: username, password: password });

    if (resp) {
      await setToken(resp.token);
    } else {
      console.log(resp);
    }
  };

  return (
    <>
      <div>
        <div className="login">
          <h1 className="login_titulo">
            Cafet<span>eria</span> Ma<span>u</span>le
          </h1>
          <h1 className="login_titulo">
            Regis<span>tra</span> Tu
            <span>Cue</span>nta
          </h1>
        </div>

        <form className=" login_cuerpo my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5 ">
            <label
              className="uppercase
        text-gray-600 block text-xl font-bold "
              for="text"
            >
              usuario
            </label>
            <input
              id="text"
              type="text"
              className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="usuario"
            />
            <label
              className="uppercase
        text-gray-600 block text-xl font-bold "
              for="email"
            >
              Correo
            </label>
            <input
              id="email"
              type="email"
              className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="correo"
            />
            <label
              className="uppercase
        text-gray-600 block text-xl font-bold "
              for="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="contraseña"
            />
            <label
              className="uppercase
        text-gray-600 block text-xl font-bold "
              for="password2"
            >
              Repetir Contraseña
            </label>
            <input
              id="password2"
              type="password"
              className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="contraseña"
            />
          </div>
          <button
            className=" bg-yellow-800 mb-5 w-full  py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-yellow-950 transition-colors "
            onClick={login}
          >
            Registrarse
          </button>
          <nav>
            <NavLink
              className="block text-center my-5 text-black font-bold uppercase text-xl hover:text-yellow-500"
              to="/login"
            >
              ¿Tienes Una Cuenta? Inicia Sesión
            </NavLink>
          </nav>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
