import React, { useRef, useState, useEffect } from 'react'; // esta es la que se despliega, esta si vale
import ReactEcharts from 'echarts-for-react';

const GraficasCiclo = ({ onSelectCiclo }) => {
  const chartRef = useRef(null);
  const [ciclos, setCiclos] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarContenido, setMostrarContenido] = useState(false);

  useEffect(() => {
    const graficasAdmin = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/ciclos', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Error con el servidor: ${response.statusText}`);
        }
        const data = await response.json();
        setCiclos(data.ciclos); // Actualiza el estado con la lista de ciclos
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Maneja el error
      }
    };
    graficasAdmin();
  }, []);

  return (
    <div className="App p-10 grid min-h-screen bg-[#f1f1f1] dark:bg-slate-700">
        {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ciclos.length > 0 ? (
            ciclos.map((ciclo, index) => (
              <divkey={index}className="flex-col selection:p-6 h-[200px] p-2 dark:bg-gray-500 rounded-lg shadow-md">
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
              </divkey=>
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

export default graficasAdmin;