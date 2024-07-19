import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unidades from './unidades';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importa el icono de advertencia
import Dashboardview from './Dashboardview';
import { SnackbarProvider, useSnackbar } from 'notistack';

const EstudianteCursa = ({ viewBotonStudent = true, viewBottonForm = true, ShowDelete = true, id, idDocente }) => {
  const [Estudiante, setEstudiante] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [materia, setMateria] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [showBoton, setShowBoton] = useState(viewBotonStudent);
  const [showForm, setShowForm] = useState(viewBottonForm);
  const [showDelete, setshowDelete] = useState(ShowDelete);
  const [refresh, setRefresh] = useState(0); // Estado para controlar la actualización de Unidades
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const { enqueueSnackbar } = useSnackbar();
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    const fetchCursa = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/estudiantes/materia/${id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const responseData = await response.json();
        setEstudiante(responseData.estudiante);
        setData(responseData.cursa);
        setMateria(responseData.materia);
        setUnidades(responseData.unidades);
        console.log(responseData);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        enqueueSnackbar('Error al cargar los estudiantes', { variant: 'error' });
      }
    };

    fetchCursa();
  }, [id, enqueueSnackbar]);

  const eliminarEstudiante = async (estudiante, materia) => {
    try {
      const eliminar = await fetch(`http://127.0.0.1:5000/estudiantes/eliminar/cursa/estudiante/${estudiante}/materia/${materia}`, {
        method: 'DELETE',
      });
      if (!eliminar.ok) {
        throw new Error(`Network response was not ok: ${eliminar.statusText}`);
      }
      enqueueSnackbar('Estudiante eliminado de la materia', { variant: 'success' });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      enqueueSnackbar('Error al eliminar el estudiante de la materia', { variant: 'error' });
    }
  };

  const crearUnidad = async (nombre) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/materia/crear/unidad/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      enqueueSnackbar('Unidad creada correctamente', { variant: 'success' });
      setShowModal(false); // Cerrar el modal después de crear la unidad
      setRefresh(prev => prev + 1); // Actualizar el estado `refresh` para forzar la actualización de `Unidades`
      setUnidades([...unidades, { nombre }]); // Actualizar el estado de `unidades` con la nueva unidad
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Error al crear la unidad', { variant: 'error' });
      setError(error.message);
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await crearUnidad(e.target.nombre.value.toUpperCase());
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-slate-700 min-h-screen p-6">
        <h1 className="text-4xl text-center font-bold text-gray-800 dark:text-white mb-6">
          {materia.nombre} - Paralelo: "{data.paralelo}"
        </h1>

        <Unidades 
          title={'Unidades'} 
          baseUrl={`http://127.0.0.1:5000/materia/`} 
          endpoint="unidad" 
          idMateria={id} 
          refresh={refresh} // Pasar `refresh` a Unidades
        />

        {showForm && (
          unidades.length === 3 ? (
            setShowForm(false)
          ) : (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowModal(true)} // Abre el modal
                className="bg-[#529914] dark:bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-[#3C6E10] transition-colors duration-300"
              >
                Crear Unidad
              </button>
            </div>
          )
        )}

        <hr className="my-6 border-t-3 border-green-500" />

        <div className="mt-8">
          {error && <p className="text-red-500 text-center dark:text-red-400">Error: {error}</p>}
          {showBoton && (
            <div className="flex justify-center mb-6">
              <button onClick={() => setShowTable(!showTable)} className="bg-[#529914] dark:bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-[#3C6E10] transition-colors duration-300">
                Ver Estudiantes ({Estudiante.length})
              </button>
            </div>
          )}

          {showTable && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                <tr className="bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-100">
                    <th className="py-2 px-4">N°</th>
                    <th className="py-2 px-4">Apellidos</th>
                    <th className="py-2 px-4">Nombres</th>
                    {showDelete && (
                      <th className="py-2 px-4">Eliminar</th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {Estudiante.map((estudiante, index) => (
                    <tr key={index} className="border-t dark:border-gray-700">
                      <td className="py-2 px-4 text-center dark:text-gray-300">{index + 1}</td>
                      <td className="py-2 px-4 dark:text-gray-300">{estudiante.user_primer_apellido} {estudiante.user_segundo_apellido}</td>
                      <td className="py-2 px-4 dark:text-gray-300">{estudiante.user_primer_nombre} {estudiante.user_segundo_nombre}</td>
                      {showDelete && (
                        <td className="py-2 px-4 text-center">
                          <button onClick={() => eliminarEstudiante(estudiante.user_cedula, materia.idmateria)} className="bg-[#529914] text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-300">
                            Eliminar
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear unidad */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm dark:bg-gray-800 dark:bg-opacity-70">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg dark:bg-gray-900">
            <h2 className="text-2xl mb-4 text-center dark:text-white">Crear Unidad</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-white">Nombre de la Unidad:</label>
                <input
                  type="text"
                  name="nombre"
                  className="w-full px-4 py-2 border rounded mt-1"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                  Crear Unidad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};


export default EstudianteCursa;
