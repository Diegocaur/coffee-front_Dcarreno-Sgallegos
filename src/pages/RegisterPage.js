import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/loginPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([username, email, password, repetirPassword].includes("")) {
      console.log("Todos los campos son obligatorios");
      return;
    }
    if (password !== repetirPassword) {
      console.log("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 8) {
      console.log("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      console.log("Usuario registrado correctamente");

      // Reiniciar el formulario
      setUsername("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <div>
      <div className="handleSubmit">
        <h1 className="handleSubmit_titulo">
          Cafet<span>eria</span> Ma<span>u</span>le
        </h1>
        <h1 className="handleSubmit_titulo">
          Regis<span>tra</span> Tu
          <span>Cue</span>nta
        </h1>
      </div>

      <form className="handleSubmit_cuerpo my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            id="username"
            type="text"
            className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
          />

          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Correo
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
          />

          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />

          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="repetirPassword"
          >
            Repetir Contraseña
          </label>
          <input
            id="repetirPassword"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
            placeholder="Repetir Contraseña"
          />
        </div>

        <button
          className="bg-yellow-800 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-yellow-950 transition-colors"
          onClick={handleSubmit}
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
  );
};

export default RegisterPage;
