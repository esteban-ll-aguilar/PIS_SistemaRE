import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';
import CargandoBottonAnimation from '../../../components/funtions/cargandoBottonAnimation';


const FormEstudianteDocente = ({ id }) => {
    const [estudianteFile, setEstudianteFile] = useState(null);
    const [docenteFile, setDocenteFile] = useState(null);
    const [nombrePeriodo, setNombrePeriodo] = useState('');
    //fecha en formato dd-mm-aaaa
    const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
    const [fechaFin, setFechaFin] = useState('');
    const { enqueueSnackbar } = useSnackbar(); // Obtener enqueueSnackbar aquí
    const [loading, setLoading] = useState(false);

    const handleEstudianteFileChange = (event) => {
        setEstudianteFile(event.target.files[0]);
    };

    const handleDocenteFileChange = (event) => {
        setDocenteFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!estudianteFile || !docenteFile) {
            enqueueSnackbar('Por favor seleccione ambos archivos.', { variant: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('estudianteFile', estudianteFile);
        formData.append('docenteFile', docenteFile);
        formData.append('nombrePeriodo', nombrePeriodo);
        formData.append('fechaInicio', fechaInicio);
        formData.append('fechaFin', fechaFin);
        formData.append('id', id);

        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:5000/crear_estudiantes_docentes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                enqueueSnackbar('Archivos cargados exitosamente', { variant: 'success' });
                setLoading(false);
                window.location.reload();
            } else {
                enqueueSnackbar('Error al cargar los archivos', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            enqueueSnackbar('Error al enviar los archivos, verifique que el formato de los datos sea el correcto', { variant: 'error' });
        } finally {
            setLoading(false);
        }


    };

    const obtainFile = async (file) => {
        try {
          const response = await fetch(`http://localhost:5000/obtener/documento/${file}`, {
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
          link.setAttribute('download', file);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
    
          enqueueSnackbar('Archivo descargado correctamente', { variant: 'success' });
        } catch (error) {
          console.error('Error fetching data:', error);
          enqueueSnackbar('Error al descargar el archivo', { variant: 'error' });
        }
      };

    useEffect(() => {
        if (fechaInicio) {
            const maxFechaFin = new Date(new Date(fechaInicio).setMonth(new Date(fechaInicio).getMonth() + 5)).toISOString().split('T')[0];
            setFechaFin((prevFechaFin) => (prevFechaFin && new Date(prevFechaFin) > new Date(maxFechaFin)) ? maxFechaFin : prevFechaFin);
        }
    }, [fechaInicio]);

    return (
        <div className="App min-h-screen p-6 mx-auto flex justify-center items-center dark:bg-gray-800 text-white">
            <div className="w-full max-w-lg dark:bg-gray-900 bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold mb-6 text-center dark:text-white text-black">Crear Periodo Académico con Asignación de Estudiantes y Docentes</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 gap-6 items-center text-center'>
                        <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nombrePeriodo">
                                Nombre del Periodo Académico
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="nombrePeriodo"
                                type="text"
                                value={nombrePeriodo}
                                onChange={(e) => setNombrePeriodo(e.target.value)}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-6'>
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="inicio">
                                    Fecha de Inicio
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    min={new Date().toISOString().split('T')[0]}
                                    max={fechaFin}
                                    id="inicio"
                                    type="date"
                                    value={fechaInicio}
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fin">
                                    Fecha de Fin
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    min={fechaInicio}
                                    max={new Date(new Date(fechaInicio).setMonth(new Date(fechaInicio).getMonth() + 5)).toISOString().split('T')[0]}
                                    value={fechaFin}
                                    id="fin"
                                    type="date"
                                    onChange={(e) => setFechaFin(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="estudianteFile">
                            Archivo de Estudiantes
                        </label>
                        <input
                            accept='.xlsx, .xls'
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="estudianteFile"
                            type="file"
                            onChange={handleEstudianteFileChange}
                        />
                        <p className='text-black dark:text-white text-sm'>Obtener formato de Estudiantes?
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold  px-2 py-1 m-4 text-xs rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => obtainFile('FormatoEstudiantes.xlsx')}
                                >
                                    Descargar
                                </button>
                            </p>
                    </div>
                    <div className="mb-4">
                        <>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="docenteFile">
                                Archivo de Docentes
                            </label>
                            <input
                                accept='.xlsx, .xls'
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                id="docenteFile"
                                type="file"
                                onChange={handleDocenteFileChange}
                            />
                            <p className='text-black dark:text-white text-sm'>Obtener formato de Docentes?
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold  px-2 py-1 m-4 text-xs rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => obtainFile('FormatoDocentes.xlsx')}
                                >
                                    Descargar
                                </button>
                            </p>
                        </>
                    </div>
                    <CargandoBottonAnimation loading={loading} textload='Subiendo' textunload='Subir Archivos' />
                </form>
            </div>
        </div>
    );
};

export default FormEstudianteDocente;
