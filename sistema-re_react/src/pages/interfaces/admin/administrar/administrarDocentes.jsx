import React, { useState, useEffect } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';

const AdministrarDocentes = () => {
    const [docentes, setDocentes] = useState([]);
    const [editingDocente, setEditingDocente] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [emailError, setEmailError] = useState('');
    const { enqueueSnackbar } = useSnackbar(); // Obtener enqueueSnackbar aquí

    useEffect(() => {
        const fetchDocentes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/ver/docentes', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setDocentes(data.docentes);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchDocentes();
    }, []);

    const fetchActualizarDocente = async (docente) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/actualizar/usuario', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(docente),
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
            enqueueSnackbar('Docente actualizado correctamente', { variant: 'success' });
             // Re-fetch docentes to update the list
            const updatedDocentesResponse = await fetch('http://127.0.0.1:5000/ver/docentes', {
                method: 'GET',
            });
            const updatedData = await updatedDocentesResponse.json();
            setDocentes(updatedData.docentes);
        } catch (error) {
            console.error('Error updating docente:', error);
            enqueueSnackbar('Error al actualizar docente', { variant: 'error' });
        }
    };

    const handleEditClick = (docente) => {
        setEditingDocente(docente);
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
        console.log("Datos actualizados del docente:", editingDocente);
        await fetchActualizarDocente(editingDocente);
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingDocente(null);
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
                    <tr>
                        <th className="py-2 px-4 border-b">Cédula</th>
                        <th className="py-2 px-4 border-b">Primer Nombre</th>
                        <th className="py-2 px-4 border-b">Segundo Nombre</th>
                        <th className="py-2 px-4 border-b">Primer Apellido</th>
                        <th className="py-2 px-4 border-b">Segundo Apellido</th>
                        <th className="py-2 px-4 border-b">Correo</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.map((docente) => (
                        <tr key={docente.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300">{docente.user_cedula}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300">{docente.user_primer_nombre}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300">{docente.user_segundo_nombre}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300">{docente.user_primer_apellido}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300">{docente.user_segundo_apellido}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300">{docente.user_correo}</td>
                            <td className="py-2 px-4 border-b dark:border-gray-700 dark:bg-slate-300">
                                <button
                                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                    onClick={() => handleEditClick(docente)}
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
                        <h2 className="text-2xl mb-4 text-center dark:text-white">Editar Docente</h2>
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

export default AdministrarDocentes;
