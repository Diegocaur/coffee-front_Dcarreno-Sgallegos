import { useState, useEffect, useContext } from "react";
import "../styles/coffes.css";
import { AuthContext } from "../auth/AuthContext";
import Modal from "react-modal";

function Coffes() {
  const { auth } = useContext(AuthContext);
  /*
  console.log("completo", auth);
  console.log("token", auth.token);
  console.log("rol?", auth.rol);*/

  const [cafes, setCafes] = useState([]);
  const [testimonios, SetTestimonios] = useState([]);

  const [idCoffeee, SetIdCoffee] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [testimonial, setTestimonial] = useState("");
  const [username, setUsername] = useState("");

  const [buscarNombre, setBuscarNombre] = useState("");

  const closeModal = () => {
    setUsername("");
    SetIdCoffee(null);
    setTestimonial("");
    setShowModal(false);
    setShowModal2(false);
  };

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
        console.log("cafes", cafes);
      } catch (error) {
        console.error("Error fetching cafes:", error);
      }
    };

    fetchCafes();
  }, []);

  const renderImage = (base64Image) => {
    return `data:image/png;base64,${base64Image}`;
  };

  const showtesti = async (a) => {
    console.log("show", a);
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
      console.log("cafes", testimonios);
    } catch (error) {
      console.error("Error fetching cafes:", error);
    }
    setShowModal2(true);
  };

  const showOpinar = async (id) => {
    SetIdCoffee(id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("idCoffee", idCoffeee);
      formData.append("testimonial", testimonial);
      formData.append("username", username);
      const response = await fetch(
        "http://localhost:8081/api/testimonial/crear",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Testimonial enviado con éxito");
        closeModal();
      } else {
        alert("Error al enviar el testimonial");
      }
    } catch (error) {
      alert("Error en la solicitud: " + error.message);
    }
  };

  const filtroCafes = cafes.filter((cafe) =>
    cafe.name.toLowerCase().includes(buscarNombre.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="coffes_titulo">
          <h1 className="font-black text-6xl text-yellow-950">
            Servicio de Cafetería
          </h1>
        </div>
        <div className="coffes_disp">
          <div className="contenedor_buscador">
            <input
              type="text"
              placeholder="Buscar cafés..."
              value={buscarNombre}
              onChange={(e) => setBuscarNombre(e.target.value)}
              className="buscador sombra"
            />
          </div>
          <div className="coffees sombra">
            {filtroCafes.map((cafe) => (
              <div className="coffee" key={cafe.id}>
                {auth.token && (
                  <div>
                    <div>
                      <Modal
                        isOpen={showModal}
                        onRequestClose={closeModal}
                        className="fixed inset-0 flex items-center justify-center z-50"
                        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-45 z-40"
                      >
                        <div className="font-sans bg-stone-300 bg-opacity-45 rounded-lg p-8 max-w-md mx-auto">
                          <h2 className="text-center text-2xl mb-4">
                            Editar Café
                          </h2>
                          <form
                            onSubmit={handleSubmit}
                            className="bg-white bg-opacity-45 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                          >
                            <h2 className="text-2xl font-bold mb-6 text-center">
                              Enviar Testimonial
                            </h2>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="idCoffee"
                              >
                                ID del Café
                              </label>
                              <input
                                type="text"
                                name="idCoffee"
                                id="idCoffee"
                                value={idCoffeee}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="testimonial"
                              >
                                Testimonial
                              </label>
                              <textarea
                                name="testimonial"
                                id="testimonial"
                                value={testimonial}
                                onChange={(e) => setTestimonial(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows="2"
                                maxLength="30"
                                required
                              ></textarea>
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                              >
                                Nombre de Usuario
                              </label>
                              <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                maxLength="30"
                                required
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              <button
                                type="submit"
                                className=" bg-stone-800 text-white hover:bg-stone-700 font-bold py-2 px-4 rounded"
                              >
                                Guardar cambios
                              </button>
                            </div>
                          </form>
                          <div className="flex items-center justify-center">
                            <button
                              onClick={closeModal}
                              className=" bg-amber-100 hover:bg-amber-200 font-bold py-2 px-4 rounded"
                            >
                              Salir
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                )}
                <h3>{cafe.name}</h3>
                <div className="imagen_coffee_container">
                  <img
                    className="imagen_coffee"
                    src={renderImage(cafe.image64)}
                    alt=""
                  />
                  <button
                    className="opinar"
                    onClick={() => showOpinar(cafe.idCoffee)}
                  >
                    Opinar
                  </button>
                </div>
                <p>{cafe.description}</p>
                <button 
                onClick={() => showtesti(cafe.idCoffee)}
                className="testimonios"
                >
                  Testimonios
                </button>
              </div>
            ))}
          </div>

          <div>
            <div>
              <Modal
                isOpen={showModal2}
                onRequestClose={closeModal}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"
              >
                <div className="font-sans bg-white rounded-lg p-8 max-w-md mx-auto shadow-xl">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Opiniones de Cafés
                  </h1>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
                    {testimonios.map((testimonio) => (
                      <div
                        key={testimonio.idTestimonials}
                        className="bg-white p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                      >
                        <p className="text-xl font-semibold text-gray-800">
                          Nombre de usuario:{" "}
                          <span className="font-normal">
                            {testimonio.username}
                          </span>
                        </p>
                        <p className="text-gray-600 mt-2">
                          Testimonio:{" "}
                          <span className="italic">
                            {testimonio.testimonial}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-orange-800 mt-6 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                  >
                    Cerrar
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Coffes };
