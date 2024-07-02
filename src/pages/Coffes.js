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
    <div className="coffes_disp">
      <h2 className="text-center">Nuestras Preparaciones</h2>
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
  );
}

export { Coffes };
