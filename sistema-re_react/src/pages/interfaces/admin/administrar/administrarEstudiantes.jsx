import React, { useState, useEffect } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';
import {} from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';

const AdministrarEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingDocente, setEditingDocente] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [emailError, setEmailError] = useState('');
    const { enqueueSnackbar } = useSnackbar(); // Obtener enqueueSnackbar aquí

    useEffect(() => {
        const fetchDocentes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/ver/estudiantes', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setEstudiantes(data.estudiantes);
                setFilteredEstudiantes(data.estudiantes);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchDocentes();
    }, []);

    useEffect(() => {
        const filtered = estudiantes.filter(estudiante =>
            estudiante.user_primer_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudiante.user_segundo_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudiante.user_primer_apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudiante.user_segundo_apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            estudiante.user_correo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEstudiantes(filtered);
    }, [searchTerm, estudiantes]);

    const fetchActualizarDocente = async (estudiante) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/actualizar/usuario', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estudiante),
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
            enqueueSnackbar('Estudiante actualizado correctamente', { variant: 'success' });
            // Re-fetch estudiantes to update the list
            const updatedDocentesResponse = await fetch('http://127.0.0.1:5000/ver/estudiantes', {
                method: 'GET',
            });
            const updatedData = await updatedDocentesResponse.json();
            setEstudiantes(updatedData.estudiantes);
        } catch (error) {
            console.error('Error updating estudiante:', error);
            enqueueSnackbar('Error al actualizar estudiante', { variant: 'error' });
        }
    };

    const handleEditClick = (estudiante) => {
        setEditingDocente(estudiante);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingDocente((prevDocente) => ({
            ...prevDocente,
            [name]: value.toUpperCase(),
        }));
    };

    const handleInputChangeEmail = (e) => {
        const { name, value } = e.target;
        const lowercasedValue = value.toLowerCase();
        setEditingDocente((prevDocente) => ({
            ...prevDocente,
            [name]: lowercasedValue,
        }));
        validateEmail(lowercasedValue);
    };

    const validateEmail = (email) => {
        // Expresión regular para validar el formato de correo electrónico con el dominio @unl.edu.ec
        const emailRegex = /^[^\s@]+@unl\.edu\.ec$/;
        if (email && !emailRegex.test(email)) {
            setEmailError('El correo electrónico debe tener el formato: @unl.edu.ec');
        } else {
            setEmailError('');
        }
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos actualizados del estudiante:", editingDocente);
        await fetchActualizarDocente(editingDocente);
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingDocente(null);
    };

    return (
        <>
            <div className="flex p-4 justify-center items-center mb-4">
                <div className="relative w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Buscar estudiante..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white pl-10"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaSearch className="text-gray-400 dark:text-white" />
                    </div>
                </div>
            </div>

            <table className="min-w-full bg-white border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
                    <tr>
                        <th className="py-2 px-4 border-b">Cédula</th>
                        <th className="py-2 px-4 border-b">Primer Apellido</th>
                        <th className="py-2 px-4 border-b">Segundo Apellido</th>
                        <th className="py-2 px-4 border-b">Primer Nombre</th>
                        <th className="py-2 px-4 border-b">Segundo Nombre</th>
                        <th className="py-2 px-4 border-b">Correo</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEstudiantes.map((estudiante) => (
                        <tr key={estudiante.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300 text-center">{estudiante.user_cedula}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300 ">{estudiante.user_primer_apellido}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300 ">{estudiante.user_segundo_apellido}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300 ">{estudiante.user_primer_nombre}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300 ">{estudiante.user_segundo_nombre}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300 ">{estudiante.user_correo}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300 text-center">
                                <button
                                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                    onClick={() => handleEditClick(estudiante)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm dark:bg-gray-800 dark:bg-opacity-70">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg dark:bg-gray-900">
                        <h2 className="text-2xl mb-4 text-center dark:text-white">Editar estudiante</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 dark:text-white">Cédula:</label>
                                <input
                                    type="text"
                                    name="user_cedula"
                                    value={editingDocente.user_cedula}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-white">Primer Nombre:</label>
                                <input
                                    type="text"
                                    name="user_primer_nombre"
                                    value={editingDocente.user_primer_nombre}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-white">Segundo Nombre:</label>
                                <input
                                    type="text"
                                    name="user_segundo_nombre"
                                    value={editingDocente.user_segundo_nombre}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-white">Primer Apellido:</label>
                                <input
                                    type="text"
                                    name="user_primer_apellido"
                                    value={editingDocente.user_primer_apellido}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-white">Segundo Apellido:</label>
                                <input
                                    type="text"
                                    name="user_segundo_apellido"
                                    value={editingDocente.user_segundo_apellido}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-white">Correo:</label>
                                <input
                                    type="email"
                                    name="user_correo"
                                    value={editingDocente.user_correo}
                                    onChange={handleInputChangeEmail}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                />
                                {emailError && (
                                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                                )}
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
        </>
    );
};

export default AdministrarEstudiantes;
