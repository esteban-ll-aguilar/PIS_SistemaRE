import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Unidades = ({ baseUrl, endpoint, idMateria, title }) => {
  const { id } = useParams(); // Obtén el ID del ciclo desde los parámetros de la URL

  const [unidades, setunidades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchunidades = async () => {
      try {
        const response = await fetch(`${baseUrl}/${endpoint}/${idMateria}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setunidades(data.unidades); // Actualiza el estado con la lista de unidades
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Maneja el error
      }
    };

    fetchunidades();
  }, [baseUrl, endpoint, id]);

  return (
    <div className="App p-4">
      <header className="App-header text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {unidades.length > 0 ? (
            unidades.map((unidad, index) => (
              <div key={index} className="p-8 bg-gray-100 rounded-lg shadow-md mt-8 flex flex-col justify-between w-80 h-60">
                <p className="text-xl font-semibold">Unidad: {unidad.nunidad}</p>
                <p className="text-xl font-semibold">{unidad.nombre}</p>
                <Link to={`/estudiantes/calificaciones/materia/${idMateria}/unidad/${unidad.idunidad}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-auto self-center">
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
