import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Materias = () => {
  const { id } = useParams(); // Obtén el ID del ciclo desde los parámetros de la URL
  const [materias, setMaterias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/ciclos/materias/${id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setMaterias(data); // Actualiza el estado con la lista de materias
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Maneja el error
      }
    };

    fetchMaterias();
  }, [id]);

  return (
    <div className="App min-h-screen bg-gray-100 p-4">
      <header className="App-header text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Materias del Ciclo</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materias.length > 0 ? (
            materias.map((materias, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <p className="text-xl font-semibold">{materias.nombre}</p>
                <p className="text-gray-600">ver estudiantes</p>
              </div>
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
