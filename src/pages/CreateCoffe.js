import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const CreateCoffee = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const { auth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !precio || !imagen) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    const formData = new FormData();
    formData.append("name", nombre);
    formData.append("desc", descripcion);
    formData.append("price", precio);
    formData.append("foto", imagen);

    try {
      const response = await fetch("http://localhost:8081/api/coffee/crear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al registrar café");
      }

      console.log("Café registrado correctamente");

      // Reiniciar el formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagen(null);
    } catch (error) {
      console.error("Error al registrar café:", error);
    }
  };

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  return (
    <div>
      <div className="login">
        <h1 className="  login_titulo">Cafetería Maule</h1>
        <h1 className="login_titulo">Ingresa Tu Nuevo Café</h1>
      </div>

      <form className="login_cuerpo my-10 bg-white shadow rounded-lg p-10 sombra ">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />

          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="descripcion"
          >
            Descripción
          </label>
          <input
            id="descripcion"
            type="text"
            className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
          />

          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="precio"
          >
            Precio
          </label>
          <input
            id="precio"
            type="number"
            className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio"
          />

          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="subirImagen"
          >
            Subir Imagen
          </label>
          <input
            id="subirImagen"
            type="file"
            accept="image/*"
            className="w-full mt-3 p-3 border rounded-xl bg-yellow-50"
            onChange={handleImagenChange}
          />
        </div>

        <button
          className="bg-yellow-800 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-yellow-950 transition-colors"
          onClick={handleSubmit}
        >
          Subir Nuevo Café
        </button>
      </form>
    </div>
  );
};

export default CreateCoffee;
