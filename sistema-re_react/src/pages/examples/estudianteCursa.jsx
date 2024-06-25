import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unidades from '../../components/unidades';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importa el icono de advertencia

const EstudianteCursa = ({ viewBotonStudent = true, viewBottonForm = true, ShowDelete = true}) => {
  const { id } = useParams();
  const [Estudiante, setEstudiante] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [materia, setMateria] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [showBoton, setShowBoton] = useState(viewBotonStudent);
  const [showForm, setShowForm] = useState(viewBottonForm);
  const [showDelete, setshowDelete] = useState(ShowDelete);
  const [unidades, setUnidades] = useState({});

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
      }
    };

    fetchCursa();
  }, [id]);

  const eliminarEstudiante = async (estudiante, materia) => {
    try {
      const eliminar = await fetch(`http://127.0.0.1:5000/estudiantes/eliminar/cursa/estudiante/${estudiante}/materia/${materia}`, {
        method: 'DELETE',
      });
      if (!eliminar.ok) {
        throw new Error(`Network response was not ok: ${eliminar.statusText}`);
      }
      alert('Estudiante eliminado de la materia');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-4xl text-center font-bold text-gray-800 mb-6">
          {materia.nombre} - Paralelo: "{data.paralelo}"
        </h1>

        <Unidades title={'Unidades'} baseUrl={`http://127.0.0.1:5000/materia/`} endpoint="unidad" idMateria={id} />

        { showForm && (
          unidades.length === 3 ? (
            setShowForm(false)
          ) : (
            <div className="flex justify-center mt-6">
              <Link to={`/materia/crear/unidad/${id}`} className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300">
                Crear Unidad
              </Link>
            </div>
          )
        )}
        
        <hr className="my-6 border-t-3 border-green-500" />

        <div className="mt-8">
          {error && <p className="text-red-500 text-center">Error: {error}</p>}
          {showBoton && (
            <div className="flex justify-center mb-6">
              <button onClick={() => setShowTable(!showTable)} className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300">
                Tabla de Estudiantes ({Estudiante.length})
              </button>
            </div>
          )}
          {showTable && Estudiante.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="p-4 bg-red-100 text-red-500 text-center rounded-lg shadow-md">
                <FaExclamationTriangle className="inline-block" />
                <p>Si elimina un estudiante de la materia, se eliminarán todas las calificaciones asociadas a él.</p>
                <p>Una vez eliminado el estudiante no se podra revertir este proceso</p>
              </div>
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="py-2 px-4">N°</th>
                    <th className="py-2 px-4">Apellidos</th>
                    <th className="py-2 px-4">Nombres</th>
                    {
                      showDelete && (
                        <th className="py-2 px-4">Eliminar</th>
                      )
                    }
                  </tr>
                </thead>
                <tbody>
                  {Estudiante.map((estudiante, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4">{estudiante.user_apellidos}</td>
                      <td className="py-2 px-4">{estudiante.user_nombres}</td>
                      {
                        showDelete && (
                          <td className="py-2 px-4 text-center">
                            <button onClick={() => eliminarEstudiante(estudiante.user_cedula, materia.idmateria)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-300">
                              Eliminar
                            </button>
                          </td>
                        )
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !showTable && <div className="text-center p-4 bg-white rounded-lg shadow-md">Estudiantes de la Materia</div>
          )}
        </div>
      </div>
    </>
  );
};

export default EstudianteCursa;
