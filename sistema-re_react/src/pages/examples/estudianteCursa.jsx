import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unidades from '../../components/unidades';
const EstudianteCursa = ({ viewBotonStudent=true, viewBottonForm=true}) => {
  const { id } = useParams();
  const [Estudiante, setEstudiante] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState({}); // Agrega data al estado inicial
  const [materia, setMateria] = useState({}); // Agrega materia al estado inicial
  const [showTable, setShowTable] = useState(false);
  const [showBoton, setShowBoton] = useState(viewBotonStudent);
  const [showForm, setShowForm] = useState(viewBottonForm);

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
        setData(responseData.cursa); // Actualiza data con la respuesta de la API
        setMateria(responseData.materia); // Actualiza materia con la respuesta de la API
        console.log(responseData);
      } catch (error) {
        alert('Error fetching data:', error);
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
    window.location.reload(); // Recarga la página después de eliminar
  } catch(error) {
    console.error('Error:', error);
    setError(error.message);
  }
}

return (
  <>
  <h1 className="text-3xl text-center font-bold mb-2 mt-8">{materia.nombre} Paralelo: "{data.paralelo}"</h1>

  <Unidades title={'Unidades'} baseUrl={`http://127.0.0.1:5000/materia/`} endpoint="unidad" idMateria={id}/>
  {showForm && (
    <div className="flex flex-col items-center">
      <Link to={`/materia/crear/unidad/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-5 mb-2 self-center hover:bg-blue-700">Crear Unidad</Link>
    </div>)
  }
  

  <div className="min-h-screen">
    <header className=" mb-4">
    <h1 className="text-3xl text-center font-bold mb-2 mt-8">Estudiantes</h1>

      {error && <p className="text-red-500">Error: {error}</p>}
      {showBoton && (
        <div className="flex flex-col items-center">
          <button onClick={() => setShowTable(!showTable)} className="bg-blue-500 text-white px-4 py-2 rounded mt-5 mb-2 self-center hover:bg-blue-700">Mostrar/ocultar tabla</button>
        </div>
      )}
      {showTable && Estudiante.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">N-</th>
                <th className="py-2 px-4">Apellidos</th>
                <th className="py-2 px-4">Nombres</th>
                <th className="py-2 px-4">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {Estudiante.map((estudiante, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{estudiante.user_apellidos}</td>
                  <td className="py-2 px-4">{estudiante.user_nombres}</td>
                  <td className="py-2 px-4">
                    <button onClick={() => eliminarEstudiante(estudiante.user_cedula, materia.idmateria)}  className="bg-blue-500 text-white px-4 py-2 rounded mt-auto self-center hover:bg-red-500">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !showTable && <div className="text-center p-4 bg-white rounded-lg shadow-md">Tabla de estudiantes Cursando esta Materia</div>
      )}
    </header>
  </div>
  </>
);

}

export default EstudianteCursa;
