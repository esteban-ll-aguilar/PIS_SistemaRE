import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Materias = ({ baseUrl, endpoint, parameter, title, onSelectMateria, materiasAdmin=false }) => {
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
        if (materiasAdmin) {
          setMaterias(data);
        } else {
          setMaterias(data.materias);
        }
        console.log(data);
      } catch (error) {
        console.error('Error con la base de datos:', error);
        setError(error.message); // Maneja el error
      }
    };

    fetchMaterias();
  }, [baseUrl, endpoint, parameter, materiasAdmin]);

  return (
    <div className="App p-4 bg-white min-h-screen dark:bg-slate-700">
      <header className="App-header text-center mb-4 bg-[#f1f1f1] pb-5 rounded-lg ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-white p-l">{title}</h1>
        {error && <p className="text-red-500 mb-4 dark:text-red-400">Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {materias.length > 0 ? (
            materias.map((materia, index) => (
              <div key={index} className="relative p-6 bg-white mx-6 dark:bg-gray-500 rounded-lg shadow-lg w-[300px] h-[160px] hover:shadow-2xl transition-shadow duration-300">
                <p className="text-2xl font-semibold text-[#04344c] dark:text-white mb-4">
                  {materia.nombre}
                </p>
                <button
                  onClick={() => onSelectMateria(materia.idmateria)}
                  className="text-white px-4 py-2 rounded-full text-center block mt-auto bg-[#529914] absolute bottom-0 my-4 mx-auto left-0 right-0 w-40"
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
