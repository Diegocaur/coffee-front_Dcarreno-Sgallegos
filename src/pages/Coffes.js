import { useState, useEffect } from "react";
import "../styles/coffes.css";

function Coffes() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/coffee/listacoffees"
        );
        if (!response.ok) {
          console.error("Error fetching cafes");
          return;
        }
        const data = await response.json();
        setCafes(data);
      } catch (error) {
        console.error("Error fetching cafes:", error);
      }
    };

    fetchCafes();
  }, []);

  const renderImage = (base64Image) => {
    return `data:image/png;base64,${base64Image}`;
  };

  return (
    <>
      <div className="coffes_titulo">
        <h1 className="font-black text-6xl text-yellow-950">
          Servicio de Cafetería
        </h1>
      </div>
      <div className="coffes_disp">
        <div className="coffees sombra">
          {cafes.map((cafe) => (
            <div className="coffee" key={cafe.id}>
              <h3>{cafe.name}</h3>
              <img src={renderImage(cafe.image64)} alt="" />
              <p>{cafe.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { Coffes };
