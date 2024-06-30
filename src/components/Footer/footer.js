import { Link, NavLink } from "react-router-dom";
import "./footer.css";

import Imagen1 from "./assets/gorjeo.png";
import Imagen2 from "./assets/instagram.png";
import Imagen3 from "./assets/facebook.png";
import Imagen4 from "./assets/youtube.png";

function Footer() {
  return (
    <>
      <div className="contactos">
        <div className="redes">
          <img className="cont_img" src={Imagen1} alt="" />
          <img className="cont_img" src={Imagen2} alt="" />
          <img className="cont_img" src={Imagen3} alt="" />
          <img className="cont_img" src={Imagen4} alt="" />
        </div>
        <a href="#">Desarrolladores</a>
      </div>
      <div class="inferior">
        <h5>Copyright Cafeteria CaursGallegos Talca, 2024</h5>
      </div>
    </>
  );
}

export { Footer };
