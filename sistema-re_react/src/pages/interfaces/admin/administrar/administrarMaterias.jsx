import React, { useState, useEffect } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Cargando from "../../../../components/funtions/cargando";


const AdministrarMaterias = () => {
    const [materias, setMaterias] = useState([]);
    const [editingMaterias, setEditingMaterias] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/ver/materias', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setMaterias(data.materias);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                enqueueSnackbar('Error al cargar las materias', { variant: 'error' });
            } finally {
                setLoading(false);
            }
        };
        
        fetchMaterias();
    }, [enqueueSnackbar]);

    const handleEditClick = (materia) => {
        setEditingMaterias(materia);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingMaterias((prevMateria) => ({
            ...prevMateria,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/actualizar/materia', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingMaterias),
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            await response.json();
            enqueueSnackbar('Materia actualizada correctamente', { variant: 'success' });
            setShowModal(false);
            const updatedMateriasResponse = await fetch('http://127.0.0.1:5000/ver/materias', {
                method: 'GET',
            });
            const updatedData = await updatedMateriasResponse.json();
            setMaterias(updatedData.materias);
        } catch (error) {
            console.error('Error updating materia:', error);
            enqueueSnackbar('Error al actualizar la materia', { variant: 'error' });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingMaterias(null);
    };

    const groupMateriasByCiclo = (materias) => {
        return materias.reduce((acc, materia) => {
            (acc[materia.ciclo] = acc[materia.ciclo] || []).push(materia);
            return acc;
        }, {});
    };

    const groupedMaterias = groupMateriasByCiclo(materias);

    return (
    <> 
       {loading ? (
        <Cargando />
       ) : ( 
        <div className="p-9">
            {Object.entries(groupedMaterias).map(([ciclo, materias]) => (
                <div key={ciclo}>
                    <h2 className="text-xl font-semibold my-4 text-center dark:text-white"><b>Ciclo: {ciclo}</b></h2>
                    <table className=" table-fixed w-full bg-white border border-gray-300 dark:border-gray-700 dark:bg-slate-300">
                        <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
                            <tr>
                                <th className="py-2 px-4 border-b">Nombre</th>
                                {/* <th className="py-2 px-4 border-b">Ciclo</th> */}
                                <th className="py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody >
                            {materias.map((materia) => (
                                <tr key={materia.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300">{materia.nombre}</td>
                                    {/* <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300 text-center">{materia.ciclo}</td> */}
                                    <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300 text-center">
                                        <button
                                            className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                                            onClick={() => handleEditClick(materia)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm dark:bg-gray-800 dark:bg-opacity-70">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg dark:bg-gray-900">
                        <h2 className="text-2xl mb-4 text-center dark:text-white">Editar Materia</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 dark:text-white">Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={editingMaterias?.nombre || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-white">Ciclo:</label>
                                <input
                                    type="text"
                                    name="ciclo"
                                    value={editingMaterias?.ciclo || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button type="button" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
       )}   
    </> 
  );
};

export default AdministrarMaterias;
