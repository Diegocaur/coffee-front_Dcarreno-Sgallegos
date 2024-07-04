import { useState, useEffect } from "react";
import "../styles/coffes.css";


function Coffes() {
  const [cafes, setCafes] = useState([]);
  const [testimonios, SetTestimonios] = useState([])

  const [show, setShow] = useState(false);
  const [idTest, SetIdTest]=useState(null);

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
        console.log("cafes",cafes);
      } catch (error) {
        console.error("Error fetching cafes:", error);
      }
    };

    fetchCafes();
  }, []);


  const renderImage = (base64Image) => {
    return `data:image/png;base64,${base64Image}`;
  };




  //experimental testimonios
  const showtesti = async(a) =>{
    console.log("show",a)
    try {
      const response = await fetch(
        `http://localhost:8081/api/testimonial/coffeeid?coffeeId=${a}`
      );
      if (!response.ok) {
        console.error("Error fetching cafes");
        return;
      }
      const datax = await response.json();
      SetTestimonios(datax);
      console.log("cafes",testimonios);
    } catch (error) {
      console.error("Error fetching cafes:", error);
    }
    SetIdTest(a);
    setShow(true);
  }
  const dontshow =()=>{
    setShow(false);
  }

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
              <button
              onClick={()=>showtesti(cafe.idCoffee)}
              >
                Testimonios
              </button>

              
            </div>

          ))}
        </div>


          {/* Experimental testimonios */}            
        <div>
              {
                show &&(
                  <div>
                    {console.log("testimonios",testimonios)}
                    <div>

                        {testimonios.map((testimonios) => (
                        <div key={testimonios.idTestimonials}>
                        <p>Nombre de usuario: {testimonios.username}</p>
                        <p>Testimonio: {testimonios.testimonial}</p>
                        
                    </div>
                      )
                      
                      )}
                    </div>
                    <button onClick={()=>dontshow()}>Cerrar testimonios</button>
                  </div>
                )
              }
              </div>

      </div>
    </>
  );
}

export { Coffes };
