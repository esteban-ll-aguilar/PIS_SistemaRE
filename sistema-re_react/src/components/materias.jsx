import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Materias = ({ baseUrl, endpoint, parameter, title }) => {
  const { id } = useParams(); // Obtén el ID del ciclo desde los parámetros de la URL

  const [materias, setMaterias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await fetch(`${baseUrl}/${endpoint}/${parameter}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setMaterias(data.materias); // Actualiza el estado con la lista de materias
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Maneja el error
      }
    };

    fetchMaterias();
  }, [baseUrl, endpoint, parameter]);

  return (
    <div className="App p-4 bg-gray-50 min-h-screen">
      <header className="App-header text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {materias.length > 0 ? (
            materias.map((materia, index) => (
              <div key={index} className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <p className="text-xl font-semibold text-gray-700 mb-4">{materia.nombre}</p>
                <Link
                  to={`/estudiantes/materia/${materia.idmateria}`}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-center block mt-auto hover:from-blue-600 hover:to-purple-600 transition-colors duration-300"
                >
                  Ver Estudiantes
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 bg-white rounded-lg shadow-md">
              No hay {title.toUpperCase()}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Materias;
