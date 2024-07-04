import { useState, useEffect, useContext } from "react";
import Modal from 'react-modal';
import { AuthContext } from "../auth/AuthContext";
import ToBlob from "../components/ToBlob";

function TablaCoffees(){
    const { auth } = useContext(AuthContext);
    const [cafes, setCafes] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [editingCafe, setEditingCafe] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imgBlob, setImgBlob] = useState(null);

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

    const openModal = (cafe) => {
        setEditingCafe(cafe);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setEditingCafe(null);
        setModalIsOpen(false);
    };

    const handleEdit = (cafe) => {
        setImgBlob(ToBlob(cafe.image64));
        openModal(cafe);
    };

    const handleDelete = async (idCoffee) => {
        try {
          const response = await fetch(`http://localhost:8081/api/coffee/borrar/${idCoffee}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${auth.token}`,
              },
          });
    
          if (!response.ok) {
            throw new Error('Error al eliminar el café');
          }
    
          console.log(`Café con ID ${idCoffee} eliminado correctamente`);
          setCafes(cafes.filter(cafe => cafe.idCoffee !== idCoffee));
        } catch (error) {
          console.error('Error al eliminar el café:', error);
        }
    };

    const updateCafes = async (updatedCafe) => {
        const updatedCafes = cafes.map(cafe =>
            cafe.idCoffee === updatedCafe.idCoffee ? updatedCafe : cafe
        );
        setCafes(updatedCafes);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', editingCafe.idCoffee);
            formData.append('name', editingCafe.name);
            formData.append('desc', editingCafe.description);
            formData.append('price', editingCafe.price);
      
            if (selectedFile) {
              formData.append('foto', selectedFile);
            } else {
              formData.append('foto', imgBlob);
            }
      
            const response = await fetch('http://localhost:8081/api/coffee/actualizar', {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
              body: formData,
            });
      
            if (!response.ok) {
              throw new Error('Error al actualizar el café');
            }

            const updatedCafe = { ...editingCafe };
            if (selectedFile) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    updatedCafe.image64 = reader.result;
                    updateCafes(updatedCafe);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                updateCafes(updatedCafe);
            }
      
            console.log('Café actualizado correctamente');
            closeModal();
          } catch (error) {
            console.error('Error al actualizar el café:', error);
          }
        };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div className="flex justify-around items-center h-screen">
            <div className="p-10 bg-slate-300">
            <div className="flex coffes_disp ">
            <table className="bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
                <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {cafes.map((cafe, index) => (
                <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{cafe.idCoffee}</td>
                    <td className="border px-4 py-2">{cafe.name}</td>
                    <td className="border px-4 py-2">{cafe.description}</td>
                    <td className="border px-4 py-2">{cafe.price}</td>
                    <td className="border px-4 py-2">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleEdit(cafe)}
                    >
                        Editar
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(cafe.idCoffee)}
                    >
                        Eliminar
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <div className="">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"
            >
                <div className="font-sans bg-white rounded-lg p-8 max-w-md mx-auto">
                    <h2 className=" text-center text-2xl mb-4">Editar Café</h2>
                    <form onSubmit={handleSubmit}>
                        <label>ID:</label>
                        <input
                            type="number"
                            className="w-full border p-2 mb-4"
                            value={editingCafe ? editingCafe.idCoffee : ''}
                            onChange={(e) =>
                                setEditingCafe({ ...editingCafe, idCoffee: e.target.value })
                            }
                            required
                        />
                        <label>Nombre:</label>
                        <input
                            type="text"
                            className="w-full border p-2 mb-4"
                            value={editingCafe ? editingCafe.name : ''}
                            onChange={(e) =>
                                setEditingCafe({ ...editingCafe, name: e.target.value })
                            }
                            required
                        />
                        <label>Descripción:</label>
                        <textarea
                            className="w-full border p-2 mb-4"
                            value={editingCafe ? editingCafe.description : ''}
                            onChange={(e) =>
                                setEditingCafe({ ...editingCafe, description: e.target.value })
                            }
                            required
                        />
                        <label>Precio:</label>
                        <input
                            type="number"
                            className="w-full border p-2 mb-4"
                            value={editingCafe ? editingCafe.price : ''}
                            onChange={(e) =>
                                setEditingCafe({ ...editingCafe, price: e.target.value })
                            }
                            required
                        />
                        <label>Imagen:</label>
                        <input
                            type="file"
                            className="w-full border p-2 mb-4"
                            onChange={handleFileChange}
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar cambios
                        </button>
                    </form>
                </div>
            </Modal>
            </div>
            
      </div>
        </div>
        </div>
        
      
    );
}

export default TablaCoffees;
