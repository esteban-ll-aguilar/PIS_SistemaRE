import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Ciclos = () => {
  const [ciclos, setCiclos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCiclos = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/ciclos`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setCiclos(data.ciclos); // Actualiza el estado con la lista de ciclos
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Maneja el error
      }
    };

    fetchCiclos();
  }, []);

  return (
    <div className="App p-10 grid bg-gray-50 min-h-screen dark:bg-slate-700 bg-gray-100">
      <header className="App-header text-center mb-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Ciclos Existentes</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
          {ciclos.length > 0 ? (
            ciclos.map((ciclo, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <p className="text-xl font-semibold text-gray-700 mb-4">Ciclo {ciclo}</p>
                
                <Link
                  to={`/admin/ciclos/materias/${ciclo}`}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-center block mt-auto hover:from-blue-600 hover:to-purple-600 transition-colors duration-300"
                >
                
                  Ver Materias
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 bg-white rounded-lg shadow-md">
              No hay ciclos
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Ciclos;
