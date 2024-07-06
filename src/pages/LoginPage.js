import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "../styles/loginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const login = async () => {
    const resp = await loginAccount({ username: username, password: password });

    if (resp) {
      await setToken(resp.token);
      Swal.fire({
        title: "Logueado exitosamente",
        icon: "success",
      }).then((result)=> {
        if (result.isConfirmed){
          navigate("/");
        }
      });
    } else {
      Swal.fire({
        title: "Ingresa credenciales validas",
        icon: "error",
      });
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
            <span>Ini</span>cia
            <span> se</span>sión
          </h1>
        </div>
        W
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
          </div>
          <button
            className=" bg-yellow-800 mb-5 w-full  py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-yellow-950 transition-colors "
            onClick={login}
          >
            Ingresa
          </button>
          <nav>
            <NavLink
              className="block text-center my-5 text-black font-bold uppercase text-xl hover:text-yellow-500"
              to="/registrar"
            >
              ¿No Tienes Una Cuenta? Registrate Acá
            </NavLink>
          </nav>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
