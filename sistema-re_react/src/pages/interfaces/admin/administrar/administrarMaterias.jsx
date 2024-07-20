import React, { useState, useEffect } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';

const CalificacionesBajasEstudiantes = ({ cedula }) => {
    const [calificaciones, setCalificaciones] = useState({});
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

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
                setCalificaciones(data.notasBajasMaterias || {}); // Proporciona un objeto vacío como valor predeterminado
            } catch (error) {
                console.error('Error fetching data:', error);
                enqueueSnackbar('Error al cargar las calificaciones bajas', { variant: 'error' });
            } finally {
                setLoading(false);
            }
        }

        fetchCalificaciones();
    }, [cedula, enqueueSnackbar]); // Asegúrate de que enqueueSnackbar esté en las dependencias

    return (
        <div className="p-6 bg-white dark:bg-gray-800 dark:text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Calificaciones Bajas de Estudiantes</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            ) : (
                Object.entries(calificaciones).map(([materia, estudiantes]) => (
                    <div key={materia} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{materia}</h2>
                        {estudiantes.length > 0 ? (
                            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="min-w-full bg-white dark:bg-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Estudiante</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Calificación</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
                                        {estudiantes.map((estudiante) => (
                                            <tr key={estudiante.user_cedula}>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {`${estudiante.user_primer_nombre} ${estudiante.user_primer_apellido}`}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {estudiante.promedio}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No hay calificaciones bajas en esta materia.</p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default CalificacionesBajasEstudiantes;
