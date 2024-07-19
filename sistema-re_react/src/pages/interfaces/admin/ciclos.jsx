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
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Maneja el error
      }
    };

    fetchCiclos();
  }, []);

  return (
    <div className="App p-10 bg-[#f1f1f1] dark:bg-slate-700 min-h-screen">
      <header className="App-header text-center mb-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Ciclos Existentes</h1>
        {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ciclos.length > 0 ? (
            ciclos.map((ciclo, index) => (
              <div
                key={index}
                className="flex flex-col justify-between p-6 h-[200px] bg-white dark:bg-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-2xl font-semibold text-gray-800 dark:text-white">Ciclo {ciclo}</p>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => onSelectCiclo(ciclo)}
                    className="text-white rounded-full text-center bg-[#529914] py-2 px-4"
                  >
                    Ver Materias
                  </button>
                </div>
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
