import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";


function TablaClientes(){
    const { auth } = useContext(AuthContext);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
          try {
            const response = await fetch(`http://localhost:8081/api/auth/clientes`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                  },
              });
            if (!response.ok) {
              console.error("Error fetching cafes");
              return;
            }
            const data = await response.json();
            setClientes(data);
            console.log(data);
          } catch (error) {
            console.error("Error fetching cafes:", error);
          }
        };
    
        fetchClientes();
      }, [auth.token]);

      const handleEdit = async (cliente) => {
        try {
            const formData = new FormData();
            formData.append('username', cliente.username);

            const endpoint = cliente.locked ? 'unlock' : 'block';
            const response = await fetch(`http://localhost:8081/api/auth/${endpoint}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error al  el cliente`);
            }

            // Actualizar localmente el cliente modificado
            const updatedClientes = clientes.map(c => {
                if (c.username === cliente.username) {
                    return {
                        ...c,
                        locked: !cliente.locked // Invertir el estado locked
                    };
                }
                return c;
            });
            setClientes(updatedClientes);

            console.log(`Cliente ado correctamente`);
        } catch (error) {
            console.error(`Error al ar el cliente:`, error);
        }
    };


    return (
        <div className="flex flex-col justify-around items-center ">
            <h1>Lista de clientes</h1>
            <div className="my-10 bg-white shadow rounded-lg p-10 sombra">
            <div className="">
            <table className="bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
                <tr>
                <th className="px-4 py-2">username</th>
                <th className="px-4 py-2">email</th>
                <th className="px-4 py-2">locked</th>
                <th className="px-4 py-2">disabled</th>
                <th className="px-4 py-2">lock/unlock</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {clientes.map((clientes, index) => (
                <tr key={index} className=" hover:bg-gray-100">
                    <td className="border px-4 py-2">{clientes.username}</td>
                    <td className="border px-4 py-2">{clientes.email}</td>
                    <td className="border px-4 py-2">{clientes.locked ? "Bloqueado" : "Desbloqueado"}</td>
                    <td className="border px-4 py-2">{clientes.disabled ? "Deshabilitado" : "Habilitado"}</td>
                    <td className="flex justify-center border px-4 py-2">
                    <button
                        className="bg-blue-500 bg-red-950 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleEdit(clientes)}
                    >
                        {clientes.locked ? "Desbloquear" : "Bloquear"}
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <div className="">
    
            </div>
            
      </div>
        </div>
        </div>
        
      
    );
}

export default TablaClientes;
