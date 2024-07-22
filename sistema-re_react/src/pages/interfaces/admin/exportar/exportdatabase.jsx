import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

const ExportDataBase = () => {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const obtainFile = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/exportar/dataBase`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.blob();

            // Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'backup.dmp'); // Nombre del archivo que se descargará
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            enqueueSnackbar('Archivo descargado correctamente', { variant: 'success' });
        } catch (error) {
            console.error('Error fetching data:', error);
            enqueueSnackbar('Error al descargar el archivo', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-200">
                Exportar Base de Datos
            </h2>
            <div className="flex justify-center items-center">
                <button
                    onClick={() => obtainFile()}
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition-transform ${loading ? 'cursor-wait scale-95' : ''}`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 016.293-7.293l1.414 1.414A6 6 0 0012 10v2a6 6 0 00-1.293 3.293l-1.414 1.414A8 8 0 014 12z"></path>
                            </svg>
                            <span>Descargando...</span>
                        </div>
                    ) : (
                        'Descargar Base de Datos'
                    )}
                </button>
            </div>
        </div>
    );
}

export default ExportDataBase;
