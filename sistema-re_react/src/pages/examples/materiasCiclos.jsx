import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Dashboardview from '../../components/Dashboardview';
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
    <>
    <Dashboardview />
    <div className="min-h-screen dark:bg-slate-700 p-4">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Materias</h1>
        {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materias.length > 0 ? (
            materias.map((materia, index) => (
              <div key={index} className="p-4 bg-white dark:bg-gray-600 rounded-lg shadow-md">
                <p className="text-xl font-semibold text-gray-700 dark:text-white">{materia.nombre}</p>
                <Link to={`/admin/estudiantes/materia/${materia.idmateria}`} 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-center block mt-auto hover:from-blue-600 hover:to-purple-600 transition-colors duration-300">
                  Ver Estudiantes
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 bg-white dark:bg-gray-600 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-white">No hay materias</p>
            </div>
          )}
        </div>
      </header>
    </div>
    </>
  );
};

export default Materias;
