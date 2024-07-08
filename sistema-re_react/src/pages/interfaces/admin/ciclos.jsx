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
    <div className="App p-10 grid min-h-screen bg-[#f1f1f1] dark:bg-slate-700">
      <header className="App-header text-center mb-4 contain-content ml-9 ">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Ciclos Existentes</h1>
        {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ciclos.length > 0 ? (
            ciclos.map((ciclo, index) => (
              <div
                key={index}
                className="flex-col selection:p-6 h-[200px] p-2 dark:bg-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 contain-content "
              >
                <div className='w-full h-[70%] flex justify-center '>
                  <p className=" mt-12 text-4xl font-semibold flex  text-gray-500 dark:text-white">Ciclo {ciclo}</p>
                </div>

                <div className='mb-4'>
                  <button
                    onClick={() => onSelectCiclo(ciclo)}
                    className="text-white rounded-full text-center bg-[#529914]  bottom-0 p-4"
                  >
                    Ver Materias este ciclo
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
