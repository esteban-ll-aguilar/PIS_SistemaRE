import React, { useState, useEffect } from 'react';

const Materias = ({ baseUrl, endpoint, parameter, title, onSelectMateria }) => {
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
        setMaterias(data.materias);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchMaterias();
  }, [baseUrl, endpoint, parameter]);

  return (
    <div className="App p-4 bg-blue-200 min-h-screen dark:bg-slate-700">
      <header className="App-header text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">{title}</h1>
        {error && <p className="text-red-500 mb-4 dark:text-red-400">Error: {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {materias.length > 0 ? (
            materias.map((materia, index) => (
              <div key={index} className="relative p-6 bg-white dark:bg-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <p className="text-xl font-semibold text-gray-700 dark:text-white mb-4">{materia.nombre}</p>
                <button
                  onClick={() => onSelectMateria(materia.idmateria)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-center block mt-auto hover:from-blue-600 hover:to-purple-600 transition-colors duration-300"
                >
                  Ver Estudiantes
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 bg-white dark:bg-gray-500 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-white">No hay {title.toUpperCase()}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Materias;
