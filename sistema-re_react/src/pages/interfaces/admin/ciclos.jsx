import React, { useState, useEffect } from 'react';

const Ciclos = ({ onSelectCiclo }) => {
  const [ciclos, setCiclos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCiclos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/ciclos', {
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
    <div className="App p-10 grid min-h-screen bg-gray-100 dark:bg-slate-700">
      <header className="App-header text-center mb-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Ciclos Existentes</h1>
        {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ciclos.length > 0 ? (
            ciclos.map((ciclo, index) => (
              <div
                key={index}
                className="relative p-6 bg-white dark:bg-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <p className="text-xl font-semibold text-gray-500 dark:text-white mb-4">Ciclo {ciclo}</p>
                <button
                  onClick={() => onSelectCiclo(ciclo)}
                  className="text-white px-4 py-2 rounded-full text-center block mt-auto bg-[#529914] absolute bottom-0 my-4 mx-auto left-0 right-0 w-40"
                >
                  Ver Materias este ciclo
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 bg-white dark:bg-gray-500 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-white">No hay ciclos</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Ciclos;
