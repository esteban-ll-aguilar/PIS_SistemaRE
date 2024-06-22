import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const EstudianteCursa = () => {
  const { id } = useParams();
  const [Estudiante, setEstudiante] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState({}); // Agrega data al estado inicial
  const [materia, setMateria] = useState({}); // Agrega materia al estado inicial
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

    } catch(error) {
        console.error('Error:', error);
        setError(error.message);
      };
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className=" mb-4">
        <h1 className="text-3xl text-center font-bold mb-2">{materia.nombre} Paralelo: "{data.paralelo}"</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        {Estudiante.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4">N-</th>
                  <th className="py-2 px-4">Nombres</th>
                  <th className="py-2 px-4">Apellidos</th>
                  <th className="py-2 px-4">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {Estudiante.map((estudiante, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{estudiante.user_nombres}</td>
                    <td className="py-2 px-4">{estudiante.user_apellidos}</td>
                    <td className="py-2 px-4">
                      <button onClick={() => eliminarEstudiante(estudiante.user_cedula, materia.idmateria)}  className="bg-blue-500 text-white px-4 py-2 rounded mt-auto self-center hover:bg-red-500">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            No hay estudiantes cursando esta materia
          </div>
        )}
      </header>
    </div>
  );
};

export default EstudianteCursa;
