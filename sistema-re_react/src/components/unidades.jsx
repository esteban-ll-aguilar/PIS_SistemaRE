import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Unidades = ({ baseUrl, endpoint, idMateria, title }) => {
  const { id } = useParams(); // Obtén el ID del ciclo desde los parámetros de la URL

  const [unidades, setUnidades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const response = await fetch(`${baseUrl}/${endpoint}/${idMateria}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setUnidades(data.unidades); // Actualiza el estado con la lista de unidades
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Maneja el error
      }
    };

    fetchUnidades();
  }, [baseUrl, endpoint, id]);

  return (
    <div className="p-5 ">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{title}</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unidades.length > 0 ? (
            unidades.map((unidad, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full"
              >
                <div>
                  <p className="text-2xl font-semibold text-gray-700 mb-4">Unidad: {unidad.nunidad}</p>
                  <p className="text-lg text-gray-600 mb-4">{unidad.nombre}</p>
                </div>
                <Link
                  to={`/estudiantes/calificaciones/materia/${idMateria}/unidad/${unidad.idunidad}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-center mt-4 hover:bg-blue-700 transition-colors duration-300"
                >
                  Ver Calificaciones
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

export default Unidades;
