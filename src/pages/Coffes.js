import { useState, useEffect, useContext } from "react";
import "../styles/coffes.css";
import { AuthContext } from "../auth/AuthContext";
import Modal from 'react-modal';

function Coffes() {
  const { auth } = useContext(AuthContext);
  console.log(auth)
  const [cafes, setCafes] = useState([]);
  const [testimonios, SetTestimonios] = useState([]);

  const [show, setShow] = useState(false);
  const [idCoffeee, SetIdCoffee] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [testimonial, setTestimonial] = useState('');
  const [username, setUsername] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setUsername("");
    SetIdCoffee(null);
    setTestimonial("");
    setShowModal(false);
    setShowForm(false);
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
    setShow(true);
  };

  const dontshow = () => {
    setShow(false);
  };

  const showOpinar = async (id) => {
    SetIdCoffee(id);
    setShowForm(true);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('idCoffee', idCoffeee);
      formData.append('testimonial', testimonial);
      formData.append('username', username);
      const response = await fetch('http://localhost:8081/api/testimonial/crear', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData
      });

      if (response.ok) {
        alert('Testimonial enviado con éxito');
        closeModal();
      } else {
        alert('Error al enviar el testimonial');
      }
    } catch (error) {
      alert('Error en la solicitud: ' + error.message);
    }
  };

  const filteredCafes = cafes.filter(cafe =>
    cafe.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <input
            type="text"
            placeholder="Buscar cafés..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <div className="coffees sombra">
            {filteredCafes.map((cafe) => (
              <div className="coffee" key={cafe.id}>
                {auth.token && (
                  <div>
                    <button
                      onClick={() => showOpinar(cafe.idCoffee)}
                    >
                      Opinar
                    </button>

                    <div>
                      {showForm && (
                        <Modal
                          isOpen={openModal}
                          onRequestClose={closeModal}
                          className="fixed inset-0 flex items-center justify-center z-50"
                          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"
                        >
                          <div className="font-sans bg-white rounded-lg p-8 max-w-md mx-auto">
                            <h2 className=" text-center text-2xl mb-4">Editar Café</h2>
                            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                              <h2 className="text-2xl font-bold mb-6 text-center">Enviar Testimonial</h2>
                              <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idCoffee">
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testimonial">
                                  Testimonial
                                </label>
                                <textarea
                                  name="testimonial"
                                  id="testimonial"
                                  value={testimonial}
                                  onChange={(e) => setTestimonial(e.target.value)}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  rows="5"
                                  required
                                ></textarea>
                              </div>
                              <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                  Nombre de Usuario
                                </label>
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  required
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <button
                                  type="submit"
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                  Guardar cambios
                                </button>
                              </div>
                            </form>
                          </div>
                        </Modal>
                      )}
                    </div>
                  </div>
                )}
                <h3>{cafe.name}</h3>
                <img src={renderImage(cafe.image64)} alt="" />
                <p>{cafe.description}</p>
                <button
                  onClick={() => showtesti(cafe.idCoffee)}
                >
                  Testimonios
                </button>
              </div>
            ))}
          </div>

          <div>
            {show && (
              <div>
                {console.log("testimonios", testimonios)}
                <div>
                  {testimonios.map((testimonios) => (
                    <div key={testimonios.idTestimonials}>
                      <p>Nombre de usuario: {testimonios.username}</p>
                      <p>Testimonio: {testimonios.testimonial}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => dontshow()}>Cerrar testimonios</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { Coffes };
