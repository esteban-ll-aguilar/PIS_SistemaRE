import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Materias = ({ baseUrl, endpoint, docente }) => {
  const { id } = useParams(); // Obtén el ID del ciclo desde los parámetros de la URL

  const [materias, setMaterias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await fetch(`${baseUrl}/${endpoint}/${docente}`, {
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
  }, [baseUrl, endpoint, id]);

  return (
    <div className="App min-h-screen p-4">
      <header className="App-header text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Materias que Imparte</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {materias.length > 0 ? (
            materias.map((materia, index) => (
              <div key={index} className="p-8 bg-gray-100 rounded-lg shadow-md mt-8 flex flex-col justify-between w-80 h-60">
                <p className="text-xl font-semibold">{materia.nombre}</p>
                <Link to={`/estudiantes/materia/${materia.idmateria}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-auto self-center">
                    Ver Estudiantes
                </Link>              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 bg-white rounded-lg shadow-md">
              No hay materias
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Materias;
