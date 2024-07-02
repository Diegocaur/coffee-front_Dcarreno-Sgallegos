import { useState, useEffect } from "react";

import imagen1 from "../assets/curso2.jpg";
import "../styles/coffes.css";

function Coffes() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchCafes = async () => {
      //conectar con api
      try {
        const response = await fetch(
          "http://localhost:8081/api/coffee/listacoffees"
        );
        if (!response.ok) {
          console.log("error");
        }
        const data = await response.json();
        setCafes(data);
      } catch (error) {
        console.error("error");
      }
    };

    fetchCafes();
  }, []);

  return (
    <>
      <div className="coffes_titulo">
        <h1 className="font-black text-6xl text-yellow-950">
          Servicio de Cafeteria
        </h1>
      </div>
      <div className="coffes_disp">
        <div className="coffees sombra">
          {cafes.map((cafe) => (
            <div className="coffee" key={cafe.id}>
              <h3>{cafe.name}</h3>
              <img src={imagen1} alt="" />
              <p>{cafe.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { Coffes };
