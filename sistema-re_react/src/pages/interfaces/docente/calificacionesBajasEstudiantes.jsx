import React, { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import Cargando from "../../../components/funtions/cargando";

const CalificacionesBajasEstudiantes = ({ cedula }) => {
    const [calificaciones, setCalificaciones] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Fecha actual
    const [time, setTime] = useState(new Date().toTimeString().split(' ')[0]); // Hora actual
    const [selectedMateria, setSelectedMateria] = useState('');
    const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [messagePredefined, setMessagePredefined] = useState('');
    
    const predefinedMessage = (materia) => {
        setMessagePredefined(`De parte del docente de la materia ${materia}:\n\n`);
    };

    useEffect(() => {
        const fetchCalificaciones = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/promedios/materias/docente/${cedula}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setCalificaciones(data.notasBajasMaterias || {});
            } catch (error) {
                console.error('Error fetching data:', error);
                enqueueSnackbar('Error al cargar las calificaciones bajas', { variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchCalificaciones();
    }, [cedula, enqueueSnackbar]);

    const handleOpenModal = (materia, estudiantes, estudiante = null) => {
        predefinedMessage(materia);
        setSelectedMateria(materia);
        setSelectedEstudiantes(estudiantes);
        setSelectedEstudiante(estudiante);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSubject('');
        setMessage('');
        setSelectedEstudiante(null);
    };

    const handleSendEmail = async (toEmail) => {
        const templateParams = {
            recipient: toEmail,
            subject: subject,
            body: `Fecha: ${date}\nHora: ${time}\nMensaje: ${messagePredefined} ${message}`,
        };
        // Aquí puedes enviar los datos a tu servidor o API
        try {
            const response = await fetch('http://127.0.0.1:5000/mail', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(templateParams),
              });
            enqueueSnackbar('Correo enviado correctamente', { variant: 'success' });
            setShowModal(false);
            
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            enqueueSnackbar('Error al enviar el correo', { variant: 'error' });
        } finally {
            setLoading(false);
        }

        console.log('Correo enviado:', templateParams);
    };

    const handleSendToAll = async () => {
        let correos = [];
        for (const estudiante of selectedEstudiantes) {
            correos.push(estudiante.user_correo);
        }
        correos = correos.slice(0, -2); // Eliminar la última coma
        console.log('Correos enviados:', correos);
        await handleSendEmail(correos); 
        handleCloseModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (selectedEstudiante) {
            await handleSendEmail(selectedEstudiante.user_correo); // Enviar al estudiante seleccionado
        } else {
            await handleSendToAll(); // Enviar a todos los estudiantes de la materia
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 dark:text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Calificaciones Bajas de Estudiantes</h1>
            {loading ? (
                <Cargando />
            ) : (
                Object.entries(calificaciones).map(([materia, estudiantes]) => (
                    <div key={materia} className="mb-8">
                        {estudiantes.length > 0 ? (
                            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                <h2 className="text-2xl font-semibold mb-4 text-center">{materia}</h2>
                                <table className="min-w-full bg-white dark:bg-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                        <tr>
                                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Cedula</th>
                                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Estudiante</th>
                                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Calificación</th>
                                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300" colSpan={2}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
                                        <tr>
                                            <td colSpan={5} className="py-4 px-6 text-center text-sm font-medium text-gray-900 dark:text-white">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={() => handleOpenModal(materia, estudiantes)}
                                                >
                                                    Enviar tutoría a todos
                                                </button>
                                            </td>
                                        </tr>
                                        {estudiantes.map((estudiante) => (
                                            <tr key={estudiante.user_cedula}>
                                                <td className="py-4 px-6 text-center whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {estudiante.user_cedula}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {`${estudiante.user_primer_apellido} ${estudiante.user_segundo_apellido} ${estudiante.user_primer_nombre} ${estudiante.user_segundo_nombre}`}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                                                    {estudiante.promedio}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                        onClick={() => handleOpenModal(materia, estudiantes, estudiante)}
                                                    >
                                                        Enviar tutoría
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-2 text-center dark:text-white">{materia}</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-center">No hay calificaciones bajas en esta materia.</p>
                            </div>
                        )}
                    </div>
                ))
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm dark:bg-gray-800 dark:bg-opacity-70">
                    <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-900 w-full max-w-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-center dark:text-white">Enviar Tutoría</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 dark:text-white">Título:</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-white">Fecha:</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-white">Hora:</label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-white">Mensaje:</label>
                                <div className="mb-2 border p-2 rounded-md bg-gray-100 dark:bg-gray-700">
                                    {messagePredefined}
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-2 border rounded mt-1"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    onClick={handleCloseModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                >
                                    {loading ? 'Enviando...' : 'Enviar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalificacionesBajasEstudiantes;
