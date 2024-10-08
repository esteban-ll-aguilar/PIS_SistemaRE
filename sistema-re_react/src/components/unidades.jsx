import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Unidades = ({ baseUrl, endpoint, idMateria, title, refresh }) => {
  const [unidades, setUnidades] = useState([]);
  const [error, setError] = useState(null);

  const fetchUnidades = async () => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}/${idMateria}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.unidades);
      setUnidades(data.unidades); // Actualiza el estado con la lista de unidades
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message); // Maneja el error
    }
  };

  useEffect(() => {
    fetchUnidades(); // Llama a la función para obtener las unidades al montar el componente
  }, [idMateria, refresh]); // Añade `refresh` como dependencia para actualizar cuando cambie

  return (
    <div className="p-5">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">{title}</h1>
        {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unidades.length > 0 ? (
            unidades.map((unidad) => (
              <div
                key={unidad.idunidad}
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full"
              >
                <div>
                  <p className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">Unidad: {unidad.nunidad}</p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{unidad.nombre}</p>
                </div>
                <Link
                  to={`/estudiantes/calificaciones/materia/${idMateria}/unidad/${unidad.idunidad}`}
                  className="bg-[#529914] text-white px-4 py-2 rounded-full text-center mt-4 hover:bg-[#3C6E10] transition-colors duration-300"
                >
                  Ver Calificaciones
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-white">No hay {title.toUpperCase()}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Unidades;
