import React from "react";

import "../styles/acerca.css";

import Imagen1 from "../assets/Diego.jpeg";
import Imagen2 from "../assets/ubicacion.jpeg";

import Imagen3 from "../assets/Pato.jpeg";

const AcercaDePage = () => {
  return (
    <>
      <div className="acerca_de-titulos">
        <h1>Sobre Nosotros</h1>
      </div>
      <div className="acerca_de-cuerpo sombra">
        <h1>Ubicacion</h1>
        <div className="acerca_de-cuerpo_ubicacion">
          <img src={Imagen2} alt="ubicacion" />
          <p>
            Nuestra Cafeteria esta ubicada en la comuna de maule por la calle
            freire, un lugar comodo e ideal para todas las personas que quieran
            disfrutar de un rico café en un ambiente cómodo y seguro.
          </p>
        </div>
        <h1>Desarrolladores</h1>
        <div id="desarrolladores" className="acerca_de-cuerpo_desarrolladores">
          <div className="contenedor_desarrollador">
            <h2>Diego Carreño</h2>
            <img className="sombra" src={Imagen1} alt="Diego" />
            <p>Desarrollador Fullstack</p>
            <p>correo@correo.com</p>
          </div>
          <div className="contenedor_desarrollador">
            <h2>Sebastian Gallegos</h2>
            <img className="sombra" src={Imagen3} alt="Pato" />
            <p>Desarrollador Fullstack</p>
            <p>correo@correo.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcercaDePage;
