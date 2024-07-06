import imagen1 from "../assets/img1.png";
import imagen2 from "../assets/img2.jpg";
import imagen3 from "../assets/img3.jpg";

function Home() {
  return (
    <>
      <div className="fondo">
        <div></div>
        <h1>Bienvenidos a Nuestra Cafeteria</h1>
        <p></p>
      </div>
      <div className="contenedorHome sombra">
        <div className="servicios">
          <div className="servicio">
            <h3>Encanto y Comodidad </h3>
            <img src={imagen1} alt=""></img>
            <p>
              Nos esforzamos por crear un ambiente acogedor y lleno de alegría,
              donde cada visita sea una experiencia memorable.{" "}
            </p>
          </div>
          <div className="servicio">
            <h3>Café y Postres</h3>
            <img src={imagen2} alt=""></img>
            <p>
              con nuestros cafés y postres artesanales que deleitan el paladar,
              estamos aquí para hacer que cada momento sea especial{" "}
            </p>
          </div>
          <div className="servicio">
            <h3>Los Mejores granos </h3>
            <img src={imagen3} alt=""></img>
            <p>
              nos enorgullece ofrecer cafés elaborados con los mejores granos
              cuidadosamente seleccionados.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { Home };
